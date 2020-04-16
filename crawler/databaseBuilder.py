import sys
sys.path.append('..')
from helpers import log

from fileIO import FileIO
from mongoengine import *
from mongoConfig import *
import math
import time

import ssl
import nltk

from threading import Thread

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('stopwords', quiet=True)
nltk.download('punkt', quiet=True)

class DatabaseBuilder:
  connect(databaseName, host=databaseAddr, port=27017)
  stopwords = set(nltk.corpus.stopwords.words('english'))
  porterStemmer = nltk.stem.PorterStemmer()
  MAX_BUFFER = 30

  def __init__(self, domain, threads, mode='DEV'):
    self.domain = domain
    self.mode = mode
    self.MAX_THREADS = threads
    self.buildQueue = []
    self.readSemaphore = True
    self.invertedIndexSemaphore = True
  
  def build(self):
    filePath = 'domains/'+self.domain +'/'+self.domain+"_index.txt" 
    pageRankFile = 'domains/'+self.domain +'/'+self.domain+"_pageRank.json" 

    rawData = FileIO.readJsonFile(filePath)
    pageRanks = FileIO.readJsonFile(pageRankFile)
    count=0
    for entry in rawData.keys():
      count+=1
      doc = rawData[entry]
      if doc['title'] == None:
        doc['title']='No Title'

      self.addDocumentToCollection(url=entry, title=doc['title'], body=doc['body'], description=doc['description'], pageRank=pageRanks[entry])
      self.buildInvertedIndex(doc['body'], entry)

      if self.mode=='DEV' and count>=5:
        break
 

  def makeDocuments(self):
    buildBufferSize = 5
    while(len(self.buildQueue) > 0):
      while(not self.readSemaphore):
        pass

      self.readSemaphore = False

      start = len(self.buildQueue) - buildBufferSize - 1 if len(self.buildQueue) >= buildBufferSize else 0
      end = len(self.buildQueue)-1 if len(self.buildQueue) >= buildBufferSize else len(self.buildQueue)
      buffer = self.buildQueue[start : end]
      del self.buildQueue[start : end]
      self.readSemaphore = True  

      for document in buffer:
        url = document['url']
        print(url)
        title = document['title']
        description = document['description']
        body = document['body']
        self.addDocumentToCollection(url=url, title=title, body=body, description=description, pageRank=1)
        self.buildInvertedIndex(body, url)
      

  def buildRawText(self):
    filePath = 'domains/'+self.domain +'/'+self.domain+"_index.txt" 
    rawData = open(filePath, 'r')

    count=0
    modePos = 0
    url, title, description, body = '','','',''

    threadPool = []
    for i in range(0, self.MAX_THREADS):
      newThread = Thread(name='builder_'+str(i), target=self.makeDocuments)
      threadPool.append(newThread)
    
    for line in rawData:
      if line == "\n":
        continue
      if modePos == 0:
        url = line[6:len(line)-1]
      elif modePos == 1:
        title = line[7:len(line)-1]
      elif modePos == 2:
        description = line[13: len(line)-1]
      elif modePos == 3:
        body = line[6:len(line)-1]
      
      modePos +=1

      if modePos == 4:
        count += 1
        self.buildQueue.append({'url': url, 'title': title, 'description': description, 'body': body})
        
        if(len(self.buildQueue) == DatabaseBuilder.MAX_BUFFER):
          for i in range(0, self.MAX_THREADS):
            threadPool[i].start()
          for i in range(0, self.MAX_THREADS):
            threadPool[i].join()

        modePos = modePos % 4
        if self.mode == 'DEV' and count >=40:
          break
  
  def addDocumentToCollection(self, url, title, body, description, pageRank):
    log("crawler", "Adding "+url+" to collection.")
    crawlerDoc = Crawler(url=url, title=title, body=body, description=description, pageRank=pageRank, tfidf={'Ashwin': 0})
    crawlerDoc.save()
    
  def buildInvertedIndex(self, body, url):
    termPos = 0
    log('inverted index', 'Building inverted index for '+url)
    startTime=time.time()

    dotRemovedUrl = url.replace('.', '%114')
    for termRaw in body.split():
      termPos += 1

      if termRaw in DatabaseBuilder.stopwords:
        continue

      term=DatabaseBuilder.porterStemmer.stem(termRaw)

      while(not self.invertedIndexSemaphore):
        pass
      
      self.invertedIndexSemaphore = False
      try:
        termEntry = InvertedIndex.objects.get(term=term)
      
        if dotRemovedUrl in termEntry.doc_info:
          termEntry.doc_info[dotRemovedUrl]['termCount']+=1
          termEntry.doc_info[dotRemovedUrl]['pos'].append(termPos)

        else:
          termEntry.doc_info[dotRemovedUrl]={'url':url, 'termCount': 1, 'pos':[termPos], 'tfidf':0}
        termEntry.save()
        self.invertedIndexSemaphore = True

      except DoesNotExist:
        newTermEntry = InvertedIndex(term=term,
        doc_info={dotRemovedUrl: {
          'url': url,
          'termCount': 1,
          'pos':[termPos],
        }})
        newTermEntry.save()
        self.invertedIndexSemaphore = True

      if self.mode=='DEV' and termPos>=10:
        break
      
    log('time', 'Finished building InvertedIndex for '+url+' in '+str(time.time()-startTime) +' seconds')

  @staticmethod
  def calculateIDF():
    startTime = time.time()
    terms = InvertedIndex.objects()
    log('idf', 'Calculating IDF scores for all terms.')
    for termEntry in terms:
      docsContaining = float(len(termEntry.doc_info))
      termEntry['idf'] = math.log(Crawler.objects.count() / docsContaining, 2)
      termEntry.save()
    log('time', 'IDF Execution finished in '+str(time.time() - startTime)+' seconds.')
  
  @staticmethod
  def resetInvertedIndex():
    log('reset', 'Resetting Inverted Index Database')
    InvertedIndex.drop_collection()
    return True
  
  @staticmethod
  def resetCrawler():
    log('reset', 'Resetting Crawler Database')
    Crawler.drop_collection()
    return True

if __name__ == "__main__":
  d = DatabaseBuilder('EpiCurious')
  d.build()
  DatabaseBuilder.calculateIDF()
        
