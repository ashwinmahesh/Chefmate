import sys
sys.path.append('..')
import helpers
log = helpers.log
from fileIO import FileIO
from mongoengine import *
from mongoConfig import *

connect('chefmateDB', host='18.222.251.5', port=27017)

class DatabaseBuilder:
  def __init__(self, domain):
    self.domain = domain
  
  def build(self):
    filePath = 'domains/'+self.domain +'/'+self.domain+"_index.txt" 

    rawData = FileIO.readJsonFile(filePath)
    for entry in rawData.keys():
      doc = rawData[entry]
      if doc['title'] == None:
        doc['title']='No Title'
      self.addDocumentToCollection(docId=doc['docId'], url=entry, title=doc['title'], body=doc['body'])
      self.buildInvertedIndex(doc['body'], entry)
      break
 
  def buildRawText(self, printStatements=False):
    file = open(filePath, 'r')
    for line in file:
      if line == "\n":
        continue
      docID = line
      link = file.readline()
      title = file.readline()
      body = file.readline()

      docID = docID[7:len(docID)-1]
      link = link[6:len(link)-1]
      title = title[7:len(title)-1]
      body = body[6:len(body)-1]

      self.addDocumentToCollection(docID, link, title, body)
      if printStatements:
        log('entry', docID)
        log('entry', link)
        log('entry', title)
        log('entry', body)
  
  def addDocumentToCollection(self, docId, url, title, body):
    crawlerDoc = Crawler(url=url, title=title, body=body, docId=docId)
    crawlerDoc.save()
    
  def buildInvertedIndex(self, body, url):
    termPos = 0
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
          termEntry.doc_info.append({'url':url, 'termCount': 1, 'pos':[termPos]})
        termEntry.save()

      except DoesNotExist:
        newTermEntry = InvertedIndex(term=term, 
        doc_info=[{
          'url': url,
          'termCount': 1,
          'pos':[termPos]
        }],
        tfidf={}
        )
        newTermEntry.save()

      if termPos==5:
        break

if __name__ == "__main__":
  d = DatabaseBuilder('EpiCurious')
  print(InvertedIndex.objects.first().doc_info)
  # d.build()
        
