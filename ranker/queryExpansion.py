import math
import sys
import time
sys.path.append('..')
sys.path.append('../crawler')
from mongoConfig import *
from helpers import log
import rankerDBConfig
import re
import json

connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)
N = Crawler.objects.count()

def queryExpansion(query, terms):
  startTime = time.time()
  log("QE", 'Performing Query Expansion on ' + query)

  queryTerm = json.loads(InvertedIndex.objects.get(term=query).to_json())
  queryDocInfo = queryTerm['doc_info']

  Na = len(queryDocInfo)
  Nab, Nb = 0, 0
  
  chiSquaredVals = []
  termsList = []
  for term in terms:
    termsList.append(term['_id'])
    Nab = 0
    termDocInfo = term['doc_info']
    Nb = len(termDocInfo)
    
    for urlKey in termDocInfo:
      if urlKey in queryDocInfo:
        Nab += 1
    
    chiSquared = ((Nab - (Na * Nb)/N)**2) / (Na * Nb)
    chiSquaredVals.append(chiSquared)

  sortedChiSquaredVals = [(chiSquared, term) for chiSquared, term in sorted(zip(chiSquaredVals, termsList), reverse=True)][0:30]
  log("time", "Finished performing Query Expansion in " + str(time.time() - startTime) + ' seconds.')
  return sortedChiSquaredVals

if __name__ == "__main__":
  # characters = ['(', '.', '$']
  #add numbers and letters using for loop
  # regex = re.compile('^'+'a', re.IGNORECASE)
  # terms = InvertedIndex.objects(term=regex)
  
  terms = json.loads(InvertedIndex.objects.order_by('-term').to_json())

  queryExpansion('chicken', terms)
  # queryExpansion('butter', terms)