import time
import sys
sys.path.append('..')

from helpers import *

def findKNearestNeighbors(K, username, userIndex, userMatrix):
  startTime = time.time()
  log("KNN", 'Calculating K-Nearest Neighbors for ' + username)
  userWeights = userMatrix[userIndex, :]
  
  log('Time', 'Finished calculating KNN for ' + username)

