import sys
sys.path.append('..')
from helpers import *
from operator import itemgetter
import time

def initialize():
  log('setup', 'Initializing Ranker')
  startTime = time.time()
  recommenderData = makeRequest('recommender', '/initializeRanker')

  print(recommenderData)

  while(recommenderData == 'ERROR'):
    log('WAIT', 'Data not yet ready. Waiting...')
    time.sleep(60)
    recommenderData = makeRequest('recommender', '/initializeRanker')
    startTime = time.time()
    log('setup', 'Initializing Ranker')
    print(recommenderData)

  inMemoryData = recommenderData['content']
  log('time', 'Initialized ranker in ' + str(time.time() - startTime) + ' seconds.')
  return itemgetter('inMemoryTFIDF', 'invertedIndex', 'crawlerReverseMap', 'termReverseMap', 'pageRanks', 'authority')(inMemoryData)