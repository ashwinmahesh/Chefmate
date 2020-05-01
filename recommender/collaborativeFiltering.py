import math
import time
import sys
sys.path.append('..')
import numpy as np
from cosineSimilarity import cosineSimilarity
from helpers import *

#Pearson Correlation Coefficient Using Cosine Similarity
def PearsonCorrelation(user1Values:[float], user2Values:[float]):
  user1Values = convertListToZeroAverageList(user1Values)
  user2Values = convertListToZeroAverageList(user2Values)

  return cosineSimilarity(user1Values, user2Values)

def predictValue(predictIndex, userIndex, neighborWeights):
  totalSimilarity = 0.0
  weightedRating = 0.0
  countOfIncluded = 0

  for weights in neighorWeights:
    pass


def collaborativeFiltering(username, userIndex, userMatrix, kNearestNeighbors):
  startTime = time.time()
  log('collab', 'Beginning collaborative filtering for ' + username)

  neighborWeights = np.zeros((len(kNearestNeighbors), len(userMatrix[0])))
  for i in range(0, len(kNearestNeighbors)):
    neighborIndex = kNearestNeighbors[i][0]
    np.copyto(neighborWeights[i], userMatrix[neighborIndex])

  ##For each value, predict the value for that using nearest neighbors
  for i in range(0, len(userMatrix[userIndex])):
    if(userMatrix[userIndex][i]) != 0:
      predictValue(predictIndex=i, userIndex=i, neighborWeights=neighborWeights)

  log('time', 'Finished performing collaborative filtering on ' + username + ' in ' + str(time.time() - startTime) + ' seconds')