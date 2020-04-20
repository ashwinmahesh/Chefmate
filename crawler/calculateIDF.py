import sys
sys.path.append('..')
import math
import time
import re
from threading import Thread

from mongoengine import *
from mongoConfig import *
from helpers import log


def calculateIDF():
  connect(databaseName, host=databaseAddr, port=27017)
  startTime = time.time()
  totalDocs = Crawler.objects.count()

  log('idf', 'Calculating IDF scores for all terms.')

  for i in range(ord('a'), ord('z')+1):
    log('idf', 'Calculating IDF for all terms starting with '+chr(i - 32))
    regex = re.compile('^'+chr(i), re.IGNORECASE)
    terms = InvertedIndex.objects(term=regex)

    for termEntry in terms:
      print(termEntry.term)
      docsContaining = float(len(termEntry.doc_info))
      termEntry['idf'] = math.log(Crawler.objects.count() / docsContaining, 2)
      termEntry.save()
  
  log('time', 'IDF Execution finished in '+str(time.time() - startTime)+' seconds.')

if __name__ == '__main__':
  calculateIDF()