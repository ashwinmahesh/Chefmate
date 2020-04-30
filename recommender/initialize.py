import sys
sys.path.append('..')
from helpers import *
import time
import numpy as np
sys.path.append('../crawler')
from mongoConfig import *

LIKE_WEIGHT = 2
VISITED_WEIGHT = 1
DISLIKE_WEIGHT = -2

def initialize():
  startTime = time.time()
  log('info', 'Fetching all user info from client server')

  response = makeRequest('client', 'external/allUsers', method='POST', data={ 'code': 'harrys_chocolate_shop' })
  if(response['success'] != 1):
    log('Error', 'There was a problem connecting to the node server.')
    return [], {}, {}

  users = response['content']['users']
  userReverseMap = {}

  for i in range(0, len(users)):
    userReverseMap[users[i]['userid']] = i

  docURLs = [document['url'] for document in Crawler.objects()]
  documentReverseMap = {}
  for i in range(0, len(docURLs)):
    documentReverseMap[docURLs[i]] = i
  
  userMatrix = np.zeros((len(users), len(docURLs)))

  for userIndex in range(0, len(users)):
    currUser = users[userIndex]

    if 'likes' in currUser:
      for likedUrl in currUser['likes']:
        urlIndex = documentReverseMap.get(likedUrl.replace('%114', '.'))
        if(urlIndex != None):
          userMatrix[userIndex][urlIndex] = LIKE_WEIGHT
    
    if 'dislikes' in currUser:
      for dislikedUrl in currUser['dislikes']:
        urlIndex = documentReverseMap.get(dislikedUrl.replace('%114', '.'))
        if (urlIndex != None):
          userMatrix[userIndex][urlIndex] = DISLIKE_WEIGHT
    
    if 'history' in currUser:
      for visitedUrl in currUser['history']:
        urlIndex = documentReverseMap.get(visitedUrl)
        if (urlIndex != None):
          userMatrix[userIndex][urlIndex] += VISITED_WEIGHT

  log('time', 'Finished fetching all user info in  ' + str(time.time() - startTime) + ' seconds')
  return userMatrix, userReverseMap, documentReverseMap
