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

  def __init__(self, domain, mode='DEV'):
    self.domain = domain
    self.mode = mode
  
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
 
  def buildRawText(self, printStatements=False):
    filePath = 'domains/'+self.domain +'/'+self.domain+"_index.txt" 

    file = open(filePath, 'r')
    for line in file:
      if line == "\n":
        continue
      url = file.readline()
      title = file.readline()
      body = file.readline()

      url = link[6:len(link)-1]
      title = title[7:len(title)-1]
      body = body[6:len(body)-1]

      self.addDocumentToCollection(url, title, body)
      self.buildInvertedIndex(body, url)
      
      if printStatements:
        log('entry', link)
        log('entry', title)
        log('entry', body)
      
  
  def addDocumentToCollection(self, url, title, body, description, pageRank):
    log("crawler", "Adding "+url+" to collection.")
    crawlerDoc = Crawler(url=url, title=title, body=body, description=description, pageRank=pageRank, tfidf={})
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

      try:
        termEntry = InvertedIndex.objects.get(term=term)
      
        if dotRemovedUrl in termEntry.doc_info:
          termEntry.doc_info[dotRemovedUrl]['termCount']+=1
          termEntry.doc_info[dotRemovedUrl]['pos'].append(termPos)

        else:
          termEntry.doc_info[dotRemovedUrl]={'url':url, 'termCount': 1, 'pos':[termPos], 'tfidf':0}
        termEntry.save()

      except DoesNotExist:
        newTermEntry = InvertedIndex(term=term,
        doc_info={dotRemovedUrl: {
          'url': url,
          'termCount': 1,
          'pos':[termPos],
        }})
        newTermEntry.save()

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
        
