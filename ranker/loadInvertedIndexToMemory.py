import sys
import numpy as np
import time
sys.path.append('..')
sys.path.append('../crawler')
from mongoengine import *
from mongoConfig import *
from helpers import log


def loadInvertedIndexToMemory():
  log('info', 'Loading Inverted Index into main memory.')
  startTime=time.time()

  invertedIndex = InvertedIndex.objects()
  allTerms = [(term['doc_info'], term['term']) for term in invertedIndex]
  
  termReverseMap = {}
  for i in range(0, len(allTerms)):
    termReverseMap[allTerms[i][1]] = i

  log('time', 'Finished loading Inverted Index into main memory in ' + str(time.time()-startTime) + ' seconds.')
  return termReverseMap, invertedIndex