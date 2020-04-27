from mongoengine import *
from mongoConfig import *
import math
import time
import sys
import re
from threading import Thread
sys.path.append('..')
from helpers import log

letters = []

def tfidfWorker():
  while(len(letters) > 0):
    currentLetter = letters.pop()
    startTime = time.time()
    log('tfidf', 'Calculating TFIDF for all terms starting with ' + currentLetter.upper())
    regex = re.compile('^'+currentLetter, re.IGNORECASE)
    terms = InvertedIndex.objects(term=regex)

    for termEntry in terms: 
      term = termEntry['term']

      idf = termEntry['idf']

      for docKey in termEntry["doc_info"]:
        tf = termEntry['doc_info'][docKey]['termCount']
        log_tf = 0
        if (tf != 0):
          log_tf = math.log(tf, 2) + 1
          tf_idf = log_tf * idf

        url = termEntry['doc_info'][docKey]['url']
        if url[0:8] == 'https://':
          try:
            document = Crawler.objects.get(url=url)
          except DoesNotExist:
            continue
          if 'tfidf' not in document:
            document['tfidf'] = {'Ashwin': 0}
          document['tfidf'][term.replace('.', ',')] = tf_idf
          document.save()

    log('time', 'Finished calculating tfidf for letter ' + currentLetter.upper() + ' in ' + str(time.time() - startTime) + ' seconds')


def calculateTFIDF(threads): 
  startTime = time.time()
  connect(databaseName, host=databaseAddr, port=27017)
  log('tfidf', 'Calculating TFIDF scores for all terms and documents')

  for i in range(ord('a'), ord('z')+1):
    letters.append(chr(i))

  threadPool = []
  for i in range(0, threads):
    newThread = Thread(name='tfidf_'+str(i), target=tfidfWorker)
    threadPool.append(newThread)

  for i in range(0, threads):
    threadPool[i].start()
  
  for i in range(0, threads):
    threadPool[i].join()
      
  log("time", 'Execution finished in '+str(time.time()-startTime)+' seconds.')

if __name__ == "__main__":
  calculateTFIDF(4)
  

