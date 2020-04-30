import sys
import numpy as np
import time
sys.path.append('..')
sys.path.append('../crawler')
from mongoengine import *
from mongoConfig import *
from helpers import log

import nltk
from nltk.stem import PorterStemmer 

porterStemmer = PorterStemmer()

def loadInvertedIndexToMemory():
  log('info', 'Loading Inverted Index into main memory.')
  startTime=time.time()

  invertedIndex = InvertedIndex.objects()
  crawlerObjects = Crawler.objects()
  
  documents = []
  pageRanks = []
  authority = []
  for document in crawlerObjects:
    documents.append(document['url'])
    pageRanks.append(document['pageRank'])
    authority.append(document['authority'])

  inMemoryTFIDF= np.zeros((InvertedIndex.objects.count(), Crawler.objects.count()))

  crawlerReverseMap = {}
  for i in range(0, len(documents)):
    crawlerReverseMap[documents[i]] = i

  termReverseMap = {}
  for i in range(0, len(invertedIndex)):
    termReverseMap[allTerms[i][1]] = i

  for document in crawlerObjects:
    docIndex = crawlerReverseMap.get(document['url'])
    for term in document['body'].split(' '):
      stemmedTerm = porterStemmer.stem(term)
      termIndex = termReverseMap.get(stemmedTerm)
      if termIndex == None:
        continue

      if 'tfidf' not in document or stemmedTerm not in document['tfidf']:
        inMemoryTFIDF[termIndex][docIndex] += 0.001
      else:
        inMemoryTFIDF[termIndex][docIndex] += document['tfidf'][stemmedTerm]

  log('time', 'Finished loading Inverted Index into main memory in ' + str(time.time()-startTime) + ' seconds.')
  return inMemoryTFIDF, invertedIndex, crawlerReverseMap, termReverseMap, pageRanks, authority