import sys
sys.path.append('..')
from helpers import *
import time
import numpy as np
sys.path.append('../crawler')
# from mongoengine import *
from mongoConfig import *

def initialize():
  # Step 1. Get all users and their likes and dislikes.
  startTime = time.time()
  log('info', 'Fetching all user info from client server')
  response = makeRequest('client', 'external/allUsers', method='POST', data={ 'code': '1234' })
  users = response['content']['users']
  documents = [url for url for document in Crawler.objects()]
  print(documents)
  # print(response['content'])
  userMatrix = np.zeros((len(users), ))

  log('time', 'Finished fetching all user info in  ' + str(time.time() - startTime) + ' seconds')
  return True
