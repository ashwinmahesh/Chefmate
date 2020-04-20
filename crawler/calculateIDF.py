import sys
sys.path.append('..')
import math
import time
import re
from threading import Thread

from mongoengine import *
from mongoConfig import *
from helpers import log

letters = []

def idfThreadWorker():
  while(len(letters) > 0):
    currentLetter = letters.pop()
    startTime = time.time()
    log('idf', 'Calculating IDF for all terms starting with ' + currentLetter.upper())
    regex = re.compile('^'+currentLetter, re.IGNORECASE)
    terms = InvertedIndex.objects(term=regex)

    for termEntry in terms:
      # print(termEntry.term)
      docsContaining = float(len(termEntry.doc_info))
      termEntry['idf'] = math.log(Crawler.objects.count() / docsContaining, 2)
      termEntry.save()
    
    log('time', 'Finished calculating idf for letter ' + currentLetter.upper() + ' in ' + str(time.time() - startTime) + ' seconds')

def calculateIDF(threads):
  connect(databaseName, host=databaseAddr, port=27017)
  startTime = time.time()
  totalDocs = Crawler.objects.count()

  log('idf', 'Calculating IDF scores for all terms.')

  for i in range(ord('a'), ord('z')+1):
    letters.append(chr(i))
  
  threadPool = []
  for i in range(0, threads):
    newThread = Thread(name='idf_'+str(i), target=idfThreadWorker)
    threadPool.append(newThread)

  for i in range(0, threads):
    threadPool[i].start()
  
  for i in range(0, threads):
    threadPool[i].join()
  
  log('time', 'IDF Execution finished in '+str(time.time() - startTime)+' seconds.')

if __name__ == '__main__':
  calculateIDF(4)