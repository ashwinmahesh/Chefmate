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
from threading import Thread

connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)
N = Crawler.objects.count()
characters = ['(', '.', '$']
for i in range(0, 9):
  characters.append(str(i))
for i in range(ord('a'), ord('z')+1):
  characters.append(chr(i))

def queryExpansionWorker(queryDocInfo, terms):
  # startTime = time.time()
  # log("QE", 'Performing Query Expansion on ' + query)

  # queryTerm = json.loads(InvertedIndex.objects.get(term=query).to_json())
  # queryDocInfo = queryTerm['doc_info']

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

def queryExpansion(query, threads=1):
  startTime = time.time()
  log("QE", 'Performing Query Expansion on ' + query)

  queryTerm = json.loads(InvertedIndex.objects.get(term=query).to_json())
  queryDocInfo = queryTerm['doc_info']

  threadPool = []
  for i in range(0, threads):
    newThread = Thread(name='queryExpansion_'+str(i), target=queryExpansionWorker, args=(queryDocInfo))
    threadPool.append(newThread)
  
  for i in range(0, threads):
    threadPool[i].start()
  
  for i in range(0, threads):
    threadPool[i].join()

if __name__ == "__main__":
  # characters = ['(', '.', '$']
  #add numbers and letters using for loop
  # regex = re.compile('^'+'a', re.IGNORECASE)
  # terms = InvertedIndex.objects(term=regex)
  
  terms = json.loads(InvertedIndex.objects.order_by('-term').to_json())

  queryExpansion('chicken', terms)
  # queryExpansion('butter', terms)