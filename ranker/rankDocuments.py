import sys
sys.path.append('..')
sys.path.append('../crawler')
from mongoConfig import *
from helpers import log
import numpy as np
import time
from cosineSimilarity import cosineSimilarity

def rank(terms, inMemoryTFIDF, crawlerReverseMap, termReverseMap, pageRanks, authority):
  startTime = time.time()

  docURLs = set()
  queryTermWeights = np.zeros(InvertedIndex.objects.count())
  for term in terms:
    try:
      termEntry = InvertedIndex.objects.get(term=term)

      docInfoList=termEntry['doc_info']
      for docKey in docInfoList:
        docURLs.add(docInfoList[docKey]['url'])

      termNum = termReverseMap[term]
      queryTermWeights[termNum] += 1
    except DoesNotExist:
      log("query", 'Term not found - '+term)
  
  docUrlArr = []
  rankings = []

  for url in docURLs:
    docIndex = crawlerReverseMap[url]
    docWeight = inMemoryTFIDF[:,docIndex]
    rankVal = (cosineSimilarity(queryTermWeights, docWeight) * 0.85) + (pageRanks[docIndex] * 0.08) + (authority[docIndex] * 0.07)

    # log('Ranking', 'Ranking value of '+url+' = '+str(rankVal))

    rankings.append(rankVal)
    docUrlArr.append(url)

  sortedDocUrls = [docUrl for ranking, docUrl in sorted(zip(rankings, docUrlArr), reverse=True)]

  queryStr=''
  for term in terms:
    queryStr+=term + ' '

  log('time', 'Execution time for cosine similarities for ' + queryStr + ': ' +str(time.time()-startTime)+' seconds')
  return sortedDocUrls
