import numpy as np
from math import sqrt
import sys
sys.path.append('..')
sys.path.append('../crawler')
from helpers import log

# cos(D1, Q) = dot_product(TFIDF1, TFIDFq) / sqrt(sum(TFIDF1^2) * sum(TFIDFq^2))
def cosineSimilarity(termWeights1, termWeights2):
  if len(termWeights1) != len(termWeights2):
    log("error", "Lengths of weight vectors do not match")
    return -1

  top = np.dot(termWeights1, termWeights2.T)
  magnitude1 = np.dot(termWeights1, termWeights1.T)
  magnitude2 = np.dot(termWeights2, termWeights2.T)
  bottom = sqrt(magnitude1*magnitude2)

  if(bottom == 0):
    return 0
  return top/bottom