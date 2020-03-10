import sys
sys.path.append('..')
sys.path.append('../crawler')
from mongoengine import *
from mongoConfig import *
from helpers import log
import math
import numpy as np

# cos(D1, Q) = dot_product(TFIDF1, TFIDFq) / sqrt(sum(TFIDF1^2) * sum(TFIDFq^2))
def cosineSimilarity(termWeights1, termWeights2,):
  if len(termWeights1) != len(termWeights2):
    print("Error: Lengths of weight vectors do not match")
    return -1

  top = 0.0
  sumSquared1 = 0.0
  sumSquared2 = 0.0
  for i in range(0, len(termWeights1)):
    top+=termWeights1[i]*termWeights2[i]
    sumSquared1+=pow(termWeights1[i], 2)
    sumSquared2+=pow(termWeights2[i], 2)
  
  bottom = math.sqrt(sumSquared1*sumSquared2)
  return top/bottom

def calculateAllCosineSimilarity(terms, inMemoryTFIDF):
  connect('chefmateDB', host='18.222.251.5', port=27017)
  docIds = set()
  queryTermWeights = np.zeros(InvertedIndex.objects.count())
  for term in terms:
    termEntry = InvertedIndex.objects.get(term=term)

    docInfoList=termEntry['doc_info']
    for doc in docInfoList:
      docIds.add(int(doc['docId']))

    termNum = int(termEntry['termNum'])
    queryTermWeights[termNum] += 1
  
  cosineSimilarities = []
  for docId in docIds:
    docWeight = inMemoryTFIDF[:,docId]
    cosSim = cosineSimilarity(queryTermWeights, docWeight)
    cosineSimilarities.append(cosSim)
  
  return cosineSimilarities

if __name__ =="__main__":
  pass
  # calculateCosineSimilarity(['meal', 'bake'])
    # calculateAllCosineSimilarity(['recip'])