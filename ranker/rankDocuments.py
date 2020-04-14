import sys
sys.path.append('..')
sys.path.append('../crawler')
from mongoConfig import *
from helpers import log
import numpy as np
import time
from cosineSimilarity import cosineSimilarity

def rank(terms, termReverseMap):
  startTime = time.time()

  docURLs = set()
  queryTermWeights = np.zeros(len(termReverseMap))
  queryStr=''
  for term in terms:
    queryStr+=term + ' '
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
    document = Crawler.objects.get(url=url)
    docWeights = np.zeros(len(termReverseMap))
    for term in document['body']:
      termNum = termReverseMap.get(term)
      if(termNum == None):
        continue
      docWeights[termNum] += 1

    rankVal = (cosineSimilarity(queryTermWeights, docWeights) * 0.85) + (document['pageRank'] * 0.08) + (document['authority'] * 0.07)

    rankings.append(rankVal)
    docUrlArr.append(url)

  sortedDocUrls = [docUrl for ranking, docUrl in sorted(zip(rankings, docUrlArr), reverse=True)]

  log('time', 'Execution time for cosine similarities for ' + queryStr + ': ' +str(time.time()-startTime)+' seconds')
  return sortedDocUrls
