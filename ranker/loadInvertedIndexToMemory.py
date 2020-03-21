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

  invertedIndex = [(term['doc_info'], term['termNum']) for term in InvertedIndex.objects()]
  crawler = [document['url'] for document in Crawler.objects()]
  inMemoryTFIDF= np.zeros((InvertedIndex.objects.count(), Crawler.objects.count()))

  crawlerMapTime = time.time()
  crawlerReverseMap = {}
  for i in range(0, len(crawler)):
    crawlerReverseMap[crawler[i]] = i
  log('time', 'Finished building Crawler Reverse Map in ' + str(time.time()-crawlerMapTime) + ' seconds')

  for termEntry in invertedIndex:
    termNum = termEntry[1]
    for doc in termEntry[0]:
      url=doc['url']
      crawlerAxisPos = crawlerReverseMap[url]
      try:
        inMemoryTFIDF[termNum][crawlerAxisPos] = doc['tfidf']
      except:
        inMemoryTFIDF[termNum][crawlerAxisPos] = 0

  log('time', 'Finished loading Inverted Index into main memory in ' + str(time.time()-startTime) + ' seconds.')
  return inMemoryTFIDF, crawlerReverseMap