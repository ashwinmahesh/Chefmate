import sys
sys.path.append('..')
sys.path.append('../crawler')
from mongoengine import *
from mongoConfig import *
from helpers import log
import math
import numpy as np
import time

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

def calculateAllCosineSimilarity(terms, inMemoryTFIDF):
  startTime = time.time()
  connect('chefmateDB', host='18.222.251.5', port=27017)
  docIds = set()
  queryTermWeights = np.zeros(InvertedIndex.objects.count())
  for term in terms:
    try:
      termEntry = InvertedIndex.objects.get(term=term)

      docInfoList=termEntry['doc_info']
      for doc in docInfoList:
        docIds.add(int(doc['docId']))

      termNum = int(termEntry['termNum'])
      queryTermWeights[termNum] += 1
    except DoesNotExist:
      log("query", 'Term not found - '+term)
  
  docIdArr = []
  cosineSimilarities = []

  for docId in docIds:
    docWeight = inMemoryTFIDF[:,docId]
    cosSim = cosineSimilarity(queryTermWeights, docWeight)
    log('cosine', 'Cosine similarity with doc '+str(docId)+' = '+str(cosSim))
    cosineSimilarities.append(cosSim)
    docIdArr.append(docId)
  
  sortedDocIds = [docId for cosSim, docId in sorted(zip(cosineSimilarities, docIdArr), reverse=True)]

  log('time', 'Execution time for cosine similarities: ' +str(time.time()-startTime)+' seconds')
  return sortedDocIds