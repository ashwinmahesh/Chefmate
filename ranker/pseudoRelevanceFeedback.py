import math
import sys
import time
sys.path.append('..')
sys.path.append('../crawler')
from helpers import log
from mongoConfig import *
import numpy as np
import rankerDBConfig

##Try it with Rocchio first. If that's not good, then use KL-Divergence
# Assume top N documents are relevant (maybe 10?), rest are non-relevant.
##This will return a new query.
#Terms with 0 or negative weights in query are dropped.
#Use new top N ranked words for new query (50?)
#Alpha = 8, Beta = 16, Gamma = 4

#Bring back in memory TFIDF otherwise fuck this cuz it'll take too long

#Run this after running rankDocuments, can't test this without doing that.
ALPHA = 8
BETA = 16
GAMMA = 4
NUM_RELEVANT = 10
MAX_WORDS = 50

def performPseudoRelevanceFeedback(queryMatrix, rankedDocuments, invertedIndex, termReverseMap):
  startTime = time.time()
  log('pseudo-relevance', 'Performing Pseudo-Relevance Feedback')

  log('time', 'Finished performing Pseudo-Relevance Feedback in ' + str(time.time() - startTime) + ' seconds')

if __name__ == '__main__':
  from nltk.stem import PorterStemmer 
  from loadInvertedIndexToMemory import loadInvertedIndexToMemory

  termReverseMap, invertedIndex = loadInvertedIndexToMemory()

  porterStemmer = PorterStemmer()
  connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)
  rawQuery = 'spicy chipotle burrito'.split()
  stemmedTerms = []
  for term in rawQuery:
    stemmedTerms.append(porterStemmer.stem(term))

  queryMatrix = np.zeros(InvertedIndex.objects.count())
  for term in stemmedTerms:
    queryMatrix[termReverseMap[term]] += 1
  performPseudoRelevanceFeedback(queryMatrix, invertedIndex, termReverseMap)