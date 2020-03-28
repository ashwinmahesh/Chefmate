import sys
import numpy as np
import time
sys.path.append('..')
sys.path.append('../crawler')
from mongoengine import *
from mongoConfig import *
from helpers import log


def loadInvertedIndexToMemory():
  log('info', 'Loading Inverted Index into main memory.')
  startTime=time.time()

  invertedIndex = [(term['doc_info'], term['term']) for term in InvertedIndex.objects()]
  
  documents = []
  pageRanks = []
  authority = []
  for document in Crawler.objects():
    documents.append(document['url'])
    pageRanks.append(document['pageRank'])
    authority.append(document['authority'])

  inMemoryTFIDF= np.zeros((InvertedIndex.objects.count(), Crawler.objects.count()))

  crawlerReverseMap = {}
  for i in range(0, len(documents)):
    crawlerReverseMap[documents[i]] = i

  termReverseMap = {}
  for i in range(0, len(invertedIndex)):
    termReverseMap[invertedIndex[i][1]] = i

  for termEntry in invertedIndex:
    termNum = termReverseMap[termEntry[1]]
    for docKey in termEntry[0]:
      doc = termEntry[0][docKey]
      url=doc['url']
      crawlerAxisPos = crawlerReverseMap[url]
      try:
        inMemoryTFIDF[termNum][crawlerAxisPos] = doc['tfidf']
      except:
        inMemoryTFIDF[termNum][crawlerAxisPos] = 0

  log('time', 'Finished loading Inverted Index into main memory in ' + str(time.time()-startTime) + ' seconds.')
  return inMemoryTFIDF, crawlerReverseMap, termReverseMap, pageRanks, authority