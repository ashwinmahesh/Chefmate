import math
import sys
import time
sys.path.append('..')
sys.path.append('../crawler')
from mongoConfig import *
from helpers import log

def queryExpansion(query):
  startTime = time.time()
  log("QE", 'Performing Query Expansion on ' + query)
  log("time", "Finished performing Query Expansion in " + str(time.time() - startTime) + ' seconds.')

if __name__ == "__main__":
  queryExpansion('peanut butter and jelly')