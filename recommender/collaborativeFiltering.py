import math
import numpy as np

def convertWeightsToZeroAverage(userWeights):
  sumVal = 0.0
  count = 0.0
  for i in range(0, len(userWeights)):
    if userWeights[i] != 0:
      sumVal += userWeights[i]
      count+=1.0
  avg = sumVal / count
  zeroAvgWeights = np.zeros(len(userWeights))
  for i in range(0, len(userWeights)):
    if userWeights[i] !=0:
      zeroAvgWeights[i] = userWeights[i] - avg
  
  return zeroAvgWeights

def collaborativeFiltering():
  pass