import sys
sys.path.append('..')
import helpers
log = helpers.log
from fileIO import FileIO
from mongoengine import *
from mongoConfig import *
import math
import time

class DatabaseBuilder:
  docCount = 0
  termNum=0
  connect(databaseAddr, host='18.222.251.5', port=27017)

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

      self.addDocumentToCollection(docId=doc['docId'], url=entry, title=doc['title'], body=doc['body'], pageRank=pageRanks[entry])
      self.buildInvertedIndex(doc['body'], entry, doc['docId'])

      if self.mode=='DEV' and count>=5:
        break
 
  def buildRawText(self, printStatements=False):
    filePath = 'domains/'+self.domain +'/'+self.domain+"_index.txt" 

    file = open(filePath, 'r')
    for line in file:
      if line == "\n":
        continue
      docID = line
      url = file.readline()
      title = file.readline()
      body = file.readline()

      docID = docID[7:len(docID)-1]
      url = link[6:len(link)-1]
      title = title[7:len(title)-1]
      body = body[6:len(body)-1]

      self.addDocumentToCollection(docID, url, title, body)
      self.buildInvertedIndex(body, url)
      
      if printStatements:
        log('entry', docID)
        log('entry', link)
        log('entry', title)
        log('entry', body)
      
  
  def addDocumentToCollection(self, docId, url, title, body, pageRank):
    log("crawler", "Adding "+url+" to collection.")
    crawlerDoc = Crawler(url=url, title=title, body=body, _id=str(docId), pageRank=pageRank)
    crawlerDoc.save()
    DatabaseBuilder.docCount+=1
    
  def buildInvertedIndex(self, body, url, docId):
    termPos = 0
    log('inverted index', 'Building inverted index for '+url)
    startTime=time.time()
    for term in body:
      termPos += 1
      try:
        termEntry = InvertedIndex.objects.get(term=term)
        hasDoc = False

        for i in range(0, len(termEntry.doc_info)):
          doc = termEntry.doc_info[i]
          if doc['url'] == url:
            hasDoc=True
            termEntry.doc_info[i]['termCount']+=1
            termEntry.doc_info[i]['pos'].append(termPos)
            break

        if not hasDoc:
          termEntry.doc_info.append({'url':url, 'termCount': 1, 'pos':[termPos], 'docId':docId})
        termEntry.save()

      except DoesNotExist:
        newTermEntry = InvertedIndex(term=term,
        termNum=DatabaseBuilder.termNum,
        doc_info=[{
          'url': url,
          'docId': str(docId),
          'termCount': 1,
          'pos':[termPos]
        }],
        tfidf={}
        )
        newTermEntry.save()
        DatabaseBuilder.termNum += 1

      if self.mode=='DEV' and termPos>=10:
        break
    log('time', 'Finished building InvertedIndex for '+url+' in '+str(time.time()-startTime) +' seconds')

  @staticmethod
  def calculateIDF():
    startTime = time.time()
    terms = InvertedIndex.objects()
    for termEntry in terms:
      docsContaining = float(len(termEntry.doc_info))
      termEntry['idf'] = math.log(DatabaseBuilder.docCount / docsContaining, 2)
      log('idf', termEntry['term']+"= "+str(termEntry['idf']))
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
        
