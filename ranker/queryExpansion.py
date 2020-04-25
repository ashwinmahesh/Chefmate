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
from nltk.stem import PorterStemmer 

connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)
N = Crawler.objects.count()
porterStemmer = PorterStemmer()
MAX_SIMILAR_TERMS = 20

###Can do this threaded, maybe have start and end index for terms for each thread, then just use those b/c that is an array
### Look into this. See if it actually speeds up calculation.

#-------- Variables below are only used in Threaded Query Expansion -----------
specialChars = ['\(', '\.', '$']
characters = []
chiSquaredVals = []
termsList = []

def threadedQueryExpansionWorker(queryDocInfo):
  Na = len(queryDocInfo)
  while(len(characters) > 0):
    nextChar = characters.pop()
    regex = re.compile('^'+nextChar, re.IGNORECASE)
    terms = json.loads(InvertedIndex.objects(term=regex).to_json())

    Nab, Nb = 0, 0
    
    for term in terms:
      if term['_id'][0:len('https://')] == 'https://':
        continue
      Nab = 0
      termDocInfo = term['doc_info']
      Nb = len(termDocInfo)
      
      for urlKey in termDocInfo:
        if urlKey in queryDocInfo:
          Nab += 1
      
      chiSquared = ((Nab - (Na * Nb)/N)**2) / (Na * Nb)
      termsList.append(term['_id'])
      chiSquaredVals.append(chiSquared)

def threadedQueryExpansion(query, threads=1):
  startTime = time.time()
  log("QE", 'Performing Query Expansion on ' + query)

  for i in range(0, 9):
    characters.append(str(i))
  for i in range(ord('a'), ord('z')+1):
    characters.append(chr(i))
  for char in specialChars:
    characters.append(char)

  stemmedQuery = porterStemmer.stem(query)
  queryTerm = json.loads(InvertedIndex.objects.get(term=stemmedQuery).to_json())
  queryDocInfo = queryTerm['doc_info']

  threadPool = []
  for i in range(0, threads):
    newThread = Thread(name='queryExpansion_'+str(i), target=threadedQueryExpansionWorker, args=(queryDocInfo,))
    threadPool.append(newThread)
  
  for i in range(0, threads):
    threadPool[i].start()
  
  for i in range(0, threads):
    threadPool[i].join()
  
  sortedChiSquaredVals = [(chiSquared, term) for chiSquared, term in sorted(zip(chiSquaredVals, termsList), reverse=True)][0:MAX_SIMILAR_TERMS]
  log("time", "Finished performing Query Expansion in " + str(time.time() - startTime) + ' seconds.')

  return sortedChiSquaredVals

#This stores the inverted index in memory for actually really fast calculation.
#Should probably move forward with this method if we want to use it. Threading is wayyyy too slow.
def queryExpansion(query, terms):
  startTime = time.time()
  log("QE", 'Performing Query Expansion on ' + query)

  stemmedQuery = porterStemmer.stem(query)
  try:
    queryTerm = json.loads(InvertedIndex.objects.get(term=stemmedQuery).to_json())
  except DoesNotExist:
    return []
  queryDocInfo = queryTerm['doc_info']

  Na = len(queryDocInfo)
  Nab, Nb = 0, 0
  
  chiSquaredVals = []
  termsList = []
  for term in terms:
    if term['_id'][0:len('https://')] == 'https://':
      continue
    termsList.append(term['_id'])
    Nab = 0
    termDocInfo = term['doc_info']
    Nb = len(termDocInfo)
    
    for urlKey in termDocInfo:
      if urlKey in queryDocInfo:
        Nab += 1
    
    chiSquared = ((Nab - (Na * Nb)/N)**2) / (Na * Nb)
    chiSquaredVals.append(chiSquared)

  sortedChiSquaredVals = [(chiSquared, term) for chiSquared, term in sorted(zip(chiSquaredVals, termsList), reverse=True)][0:MAX_SIMILAR_TERMS]
  log("time", "Finished performing Query Expansion in " + str(time.time() - startTime) + ' seconds.')
  return sortedChiSquaredVals

if __name__ == "__main__":
  # print(queryExpansion('chicken', threads=4))
  # print(queryExpansion('butter', threads=4))

  terms = json.loads(InvertedIndex.objects.to_json())

  print(unthreadedQueryExpansion('chicken', terms))
  print(unthreadedQueryExpansion('butter', terms))
  print(unthreadedQueryExpansion('biscuits', terms))
  print(unthreadedQueryExpansion('nuggets', terms))