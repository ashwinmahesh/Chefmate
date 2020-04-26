import math
import sys
import time
sys.path.append('..')
sys.path.append('../crawler')
from helpers import log
from mongoConfig import *

##Try it with Rocchio first. If that's not good, then use KL-Divergence
# Assume top N documents are relevant (maybe 10?), rest are non-relevant.
##This will return a new query.
#Terms with 0 or negative weights in query are dropped.
#Use new top N ranked words for new query (50?)
#Alpha = 8, Beta = 16, Gamma = 4
def performPseudoRelevanceFeedback():
  startTime = time.time()
  log('pseudo-relevance', 'Performing Pseudo-Relevance Feedback')

  log('time', 'Finished performing Pseudo-Relevance Feedback in ' + str(time.time() - startTime) + ' seconds')

if __name__ == '__main__':
  connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)
  performPseudoRelevanceFeedback()