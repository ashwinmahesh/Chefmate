import time
import sys
sys.path.append('..')

from helpers import *
from cosineSimilarity import cosineSimilarity

def findKNearestNeighbors(K, username, userIndex, userMatrix):
  startTime = time.time()
  log("KNN", 'Calculating K-Nearest Neighbors for ' + username)
  userWeights = userMatrix[userIndex, :]

  indexes = []
  distances = []
  for i in range(0, len(userMatrix)):
    if i == userIndex:
      continue
    
    otherWeights = userMatrix[i, :]
    distances.append(cosineSimilarity(userWeights, otherWeights))
    indexes.append(i)
  
  sortedDistances = [(index, distance) for distance, index in sorted(zip(distances, indexes), reverse=True)]
  return sortedDistances[0 : min(K, len(sortedDistances))]

  log('Time', 'Finished calculating KNN for ' + username)

