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
BETA = 16.0
GAMMA = 4.0
NUM_RELEVANT = 10
MAX_NEW_WORDS = 50

def performPseudoRelevanceFeedback(queryMatrix, rankedDocuments, invertedIndex, termReverseMap, inMemoryTFIDF, crawlerReverseMap):
  startTime = time.time()
  log('pseudo-relevance', 'Performing Pseudo-Relevance Feedback')
  newQuery = np.zeros(len(invertedIndex))
  newQuery = queryMatrix * ALPHA

  relevantWeights = np.zeros(len(invertedIndex))
  for i in range(0, NUM_RELEVANT):
    currentDoc = rankedDocuments[i]
    docIndex = crawlerReverseMap[currentDoc]
    docWeights = inMemoryTFIDF[:, docIndex]
    relevantWeights = np.add(relevantWeights, docWeights)
  
  relevantMultiplier = float(BETA / NUM_RELEVANT)
  relevantWeights = relevantWeights * relevantMultiplier

  nonRelevantWeights = np.zeros(len(invertedIndex))
  for i in range(NUM_RELEVANT, len(rankedDocuments)):
    currentDoc = rankedDocuments[i]
    docIndex = crawlerReverseMap[currentDoc]
    docWeights = inMemoryTFIDF[:, docIndex]
    nonRelevantWeights = np.subtract(nonRelevantWeights, docWeights)
  
  nonRelevantMultiplier = float(GAMMA / (len(rankedDocuments) - NUM_RELEVANT))
  nonRelevantWeights = nonRelevantWeights * nonRelevantMultiplier

  newQuery = np.add(newQuery, relevantWeights)
  newQuery = np.add(newQuery, nonRelevantWeights)

  #TODO Calculate all the cosine similarities again and re-rank
  #Add top ranked terms to the query, refetch, then re-rank
  numberList = [i for i in range(0, len(invertedIndex))]
  sortedTermWeightings = [(termWeight, numberList) for termWeight, numberList in sorted(zip(newQuery, numberList), reverse=True)][0:MAX_NEW_WORDS]

  newQueryForCalculation = np.array(queryMatrix, copy=True)
  for term in sortedTermWeightings:
    newQueryForCalculation[numberList] += 1
  
  ###Fetch documents and perform cosine similarity

  log('time', 'Finished performing Pseudo-Relevance Feedback in ' + str(time.time() - startTime) + ' seconds')
  return newQuery