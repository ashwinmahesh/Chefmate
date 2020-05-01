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
from pseudoRelevanceFeedback import performPseudoRelevanceFeedback

porterStemmer = PorterStemmer()

def rank(uLikes, uDislikes, query, queryTerms, excludedTerms, termReverseMap, invertedIndex, inMemoryTFIDF, crawlerReverseMap, queryExpansion=False, pseudoRelevanceFeedback=False):
  startTime = time.time()

  docURLs = set()
  queryTermWeights = np.zeros(len(termReverseMap))
  queryStr=''
  didUMeanStr=''
  for term in queryTerms:
    queryStr+=term + ' '
<<<<<<< HEAD
    didUMeanStr+=term + ' '
  
=======

>>>>>>> master
  log("QE", 'Expanding Query Terms')
  fetchResults = fetchDocuments(queryTerms, invertedIndex, queryExpansion=queryExpansion)
  expandedTerms = fetchResults[0]
  didUMean = fetchResults[1]

  for x in didUMean:
    didUMeanStr = didUMeanStr.replace(x, didUMean[x])
  
  if didUMeanStr == queryStr:
    didUMeanStr = ''

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

  excludedIndexes = []
  for term in excludedTerms:
    try:
      excludedIndex = termReverseMap[term]
      excludedIndexes.append(excludedIndex)
    except:
      continue

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

    containsExcludedTerm = False

    for index in excludedIndexes:
      if docWeights[index] > 0:
        containsExcludedTerm = True
        break
    
    if containsExcludedTerm:
      containsExcludedTerm = False
      continue

    if url in uLikes:
      if uLikes[url] == query:
        rankVal = 1
      else:
        rankVal = (0.1 + cosineSimilarity(queryTermWeights, docWeights) * 0.75) + (document['pageRank'] * 0.08) + (document['authority'] * 0.07)
    elif url in uDislikes:
      if uDislikes[url] == query:
        rankVal = 0
      else:
        rankVal = (cosineSimilarity(queryTermWeights, docWeights) * 0.75) + (document['pageRank'] * 0.08) + (document['authority'] * 0.07)
    else:
      rankVal = (cosineSimilarity(queryTermWeights, docWeights) * 0.85) + (document['pageRank'] * 0.08) + (document['authority'] * 0.07)

    rankVal = (cosineSimilarity(queryTermWeights, docWeights) * 0.85) + (document['pageRank'] * 0.08) + (document['authority'] * 0.07)
    rankings.append(rankVal)
    docUrlArr.append(url)

  sortedDocUrls = [docUrl for ranking, docUrl in sorted(zip(rankings, docUrlArr), reverse=True)]
  
  if pseudoRelevanceFeedback:
    sortedDocUrls = performPseudoRelevanceFeedback(uLikes, uDislikes, query, queryTermWeights, sortedDocUrls, invertedIndex, termReverseMap, inMemoryTFIDF, crawlerReverseMap)

  log('time', 'Execution time for cosine similarities for ' + queryStr + ': ' +str(time.time()-startTime)+' seconds')
  return sortedDocUrls, didUMeanStr
