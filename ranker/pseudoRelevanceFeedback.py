import math
import sys
import time
sys.path.append('..')
sys.path.append('../crawler')
from helpers import log
from mongoConfig import *
import numpy as np
import rankerDBConfig
from cosineSimilarity import cosineSimilarity

##Try it with Rocchio first. If that's not good, then use KL-Divergence
# Assume top N documents are relevant (maybe 10?), rest are non-relevant.
##This will return a new query.
#Terms with 0 or negative weights in query are dropped.
#Use new top N ranked words for new query (50?)
#Alpha = 8, Beta = 16, Gamma = 4

#Bring back in memory TFIDF otherwise fuck this cuz it'll take too long

ALPHA = 8
BETA = 16.0
GAMMA = 4.0
NUM_RELEVANT = 10
MAX_NEW_WORDS = 50

def performPseudoRelevanceFeedback(uLikes, uDislikes, query, queryMatrix, rankedDocuments, invertedIndex, termReverseMap, inMemoryTFIDF, crawlerReverseMap, excludedIndexes):
  startTime = time.time()
  log('pseudo-relevance', 'Performing Pseudo-Relevance Feedback')
  newQuery = np.zeros(len(invertedIndex))
  newQuery = queryMatrix * ALPHA

  relevantWeights = np.zeros(len(invertedIndex))
  for i in range(0, min(len(rankedDocuments), NUM_RELEVANT)):
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

  #Add top ranked terms to the query, calculate all the cosine similarities again, and re-rank
  numberList = [i for i in range(0, len(invertedIndex))]
  sortedTermWeightings = [(termWeight, numberList) for termWeight, numberList in sorted(zip(newQuery, numberList), reverse=True)][0:MAX_NEW_WORDS]

  docURLs = set()
  newQueryForCalculation = np.array(queryMatrix, copy=True)

  for termInfo in sortedTermWeightings:
    newQueryForCalculation[termInfo[1]] += 1
    term = invertedIndex[termInfo[1]]
    docInfoList=term['doc_info']
    for docKey in docInfoList:
      url = docInfoList[docKey]['url']
      if url[0:8] == 'https://':
        docURLs.add(url)
  
  rankings = []
  docUrlArr = []

  for url in docURLs:
    try:
      document = Crawler.objects.get(url=url)
    except DoesNotExist:
      continue
    if 'Page not found' in document['title']:
      continue
    
    try:
      docIndex = crawlerReverseMap[url]
    except:
      continue
    docWeights = inMemoryTFIDF[:,docIndex]

    flag = False
    for index in excludedIndexes:
      if docWeights[index] > 0:
        flag = True
        break

    if flag: 
      continue

    if url in uLikes:
      if uLikes[url] == query:
        rankVal = 1
      else:
        rankVal = (0.1 + cosineSimilarity(newQueryForCalculation, docWeights) * 0.75) + (document['pageRank'] * 0.08) + (document['authority'] * 0.07)
    elif url in uDislikes:
      if uDislikes[url] == query:
        rankVal = 0
      else:
        rankVal = (cosineSimilarity(newQueryForCalculation, docWeights) * 0.75) + (document['pageRank'] * 0.08) + (document['authority'] * 0.07)
    else:
      rankVal = (cosineSimilarity(newQueryForCalculation, docWeights) * 0.85) + (document['pageRank'] * 0.08) + (document['authority'] * 0.07)

    rankings.append(rankVal)
    docUrlArr.append(url)

  sortedDocUrls = [docUrl for ranking, docUrl in sorted(zip(rankings, docUrlArr), reverse=True)]

  log('time', 'Finished performing Pseudo-Relevance Feedback in ' + str(time.time() - startTime) + ' seconds')
  return sortedDocUrls