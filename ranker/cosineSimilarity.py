import sys
sys.path.append('..')
sys.path.append('../crawler')
from mongoengine import *
from mongoConfig import *
from helpers import log
import math
import numpy as np
import time
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer 
import rankerDBConfig

# cos(D1, Q) = dot_product(TFIDF1, TFIDFq) / sqrt(sum(TFIDF1^2) * sum(TFIDFq^2))
def cosineSimilarity(termWeights1, termWeights2):
  if len(termWeights1) != len(termWeights2):
    print("Error: Lengths of weight vectors do not match")
    return -1

  top = np.dot(termWeights1, termWeights2.T)
  magnitude1 = np.dot(termWeights1, termWeights1.T)
  magnitude2 = np.dot(termWeights2, termWeights2.T)
  bottom = math.sqrt(magnitude1*magnitude2)

  return top/bottom

def calculateAllCosineSimilarity(terms, inMemoryTFIDF, crawlerReverseMap, termReverseMap):
  startTime = time.time()
  connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)

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
  cosineSimilarities = []

  for url in docURLs:
    docIndex = crawlerReverseMap[url]
    docWeight = inMemoryTFIDF[:,docIndex]
    cosSim = cosineSimilarity(queryTermWeights, docWeight)

    log('cosine', 'Cosine similarity with '+url+' = '+str(cosSim))
    
    cosineSimilarities.append(cosSim)
    docUrlArr.append(url)

  sortedDocUrls = [docUrl for cosSim, docUrl in sorted(zip(cosineSimilarities, docUrlArr), reverse=True)]

  queryStr=''
  for term in terms:
    queryStr+=term + ' '

  log('time', 'Execution time for cosine similarities for ' + queryStr + ': ' +str(time.time()-startTime)+' seconds')
  return sortedDocUrls

def stemQuery(query):
  output=[]
  porterStemmer = PorterStemmer()
  tokenedText = word_tokenize(query)
  for word in tokenedText:
    output.append(porterStemmer.stem(word))
  return output