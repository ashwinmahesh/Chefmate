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

def predictValue(predictIndex):
  pass

def collaborativeFiltering(username, userIndex, userMatrix):
  startTime = time.time()
  log('collab', 'Beginning collaborative filtering for ' + username)
  for i in range(0, len(userMatrix[userIndex])):
    ##Skipping entries that user already has data for
    if(userMatrix[userIndex][i]) != 0:
      continue

  log('time', 'Finished performing collaborative filtering on ' + username + ' in ' + str(time.time() - startTime) + ' seconds')