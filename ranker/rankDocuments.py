import sys
sys.path.append('..')
sys.path.append('../crawler')
from mongoConfig import *
from helpers import log
import numpy as np
import time
from cosineSimilarity import cosineSimilarity
from fetchDocuments import fetchDocuments
from nltk.stem import PorterStemmer 

porterStemmer = PorterStemmer()

def rank(queryTerms, termReverseMap, invertedIndex):
  startTime = time.time()

  docURLs = set()
  queryTermWeights = np.zeros(len(termReverseMap))
  queryStr=''
  for term in queryTerms:
    queryStr+=term + ' '
  
  log("QE", 'Expanding Query Terms')
  expandedTerms = fetchDocuments(queryTerms, invertedIndex)
  for termEntry in expandedTerms:
    docInfoList=termEntry['doc_info']
    for docKey in docInfoList:
      url = docInfoList[docKey]['url']
      if url[0:8] == 'https://':
        docURLs.add(url)

    termNum = termReverseMap[termEntry['term']]
    if termEntry['term'] in queryTerms:
      queryTermWeights[termNum] += 2
    else:
      queryTermWeights[termNum] += 1

  docUrlArr = []
  rankings = []

  log("Ranking", 'Calculating rankings for query')
  for url in docURLs:
    try:
      document = Crawler.objects.get(url=url)
    except DoesNotExist:
      continue
    if 'Page not found' in document['title']:
      continue

    docWeights = np.zeros(len(termReverseMap))
    for rawTerm in document['body'].lower().split():
      term = porterStemmer.stem(rawTerm)
      termNum = termReverseMap.get(term)
      if(termNum == None):
        continue
      if 'tfidf' not in document or term not in document['tfidf']:
        docWeights[termNum] += 0.0001
      else:
        tfidf = document['tfidf'][term]
        docWeights[termNum] += tfidf

    rankVal = (cosineSimilarity(queryTermWeights, docWeights) * 0.85) + (document['pageRank'] * 0.08) + (document['authority'] * 0.07)

    rankings.append(rankVal)
    docUrlArr.append(url)

  sortedDocUrls = [docUrl for ranking, docUrl in sorted(zip(rankings, docUrlArr), reverse=True)]

  log('time', 'Execution time for cosine similarities for ' + queryStr + ': ' +str(time.time()-startTime)+' seconds')
  return sortedDocUrls
