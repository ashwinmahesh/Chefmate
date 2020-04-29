import sys
sys.path.append('..')
from helpers import *
import time

def initialize():
  # Step 1. Get all users and their likes and dislikes.
  startTime = time.time()
  log('info', 'Fetching all user info from client server')
  response = makeRequest('client', '/external/allUsers')
  print(response['content'])

  log('time', 'Finished fetching all user info in  ' + str(time.time() - startTime) + ' seconds')

