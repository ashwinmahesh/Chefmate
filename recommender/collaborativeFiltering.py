import math
import time
import sys
sys.path.append('..')
import numpy as np
from cosineSimilarity import cosineSimilarity
from helpers import *

def PearsonCorrelation(user1Values:[float], user2Values:[float]):
  return cosineSimilarity(user1Values, user2Values)

def predictValue(predictIndex, userWeights, neighborWeights, weighted=True):
  totalSimilarity = 0.0
  weightedRating = 0.0
  countOfIncluded = 0

  for weights in neighborWeights:
    if weights[predictIndex] != 0:
      similarity = PearsonCorrelation(userWeights, weights)
      if similarity > 0:
        countOfIncluded +=1
        weightedRating += weights[predictIndex] * similarity if weighted else weights[predictIndex]
        totalSimilarity += similarity

  if (weighted and totalSimilarity == 0) or (not weighted and countOfIncluded == 0):
    return 0

  predictedValue = weightedRating / totalSimilarity if weighted else weightedRating/countOfIncluded
  return predictedValue

def collaborativeFiltering(username, userIndex, userMatrix, kNearestNeighbors):
  startTime = time.time()
  log('collab', 'Beginning collaborative filtering for ' + username)

  neighborWeights = np.zeros((len(kNearestNeighbors), len(userMatrix[0])))
  for i in range(0, len(kNearestNeighbors)):
    neighborIndex = kNearestNeighbors[i][0]
    np.copyto(neighborWeights[i], userMatrix[neighborIndex])

  predictionMatrix = np.zeros(len(userMatrix[userIndex]))
  for i in range(0, len(userMatrix[userIndex])):
    if(userMatrix[userIndex][i]) == 0:
      predictionMatrix[i] = predictValue(predictIndex=i, userWeights=userMatrix[userIndex], neighborWeights=neighborWeights)

  log('time', 'Finished performing collaborative filtering on ' + username + ' in ' + str(time.time() - startTime) + ' seconds')
  return predictionMatrix