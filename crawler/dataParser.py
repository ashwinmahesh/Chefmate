from fileIO import FileIO
import json
# import uuid
import os
import sys
sys.path.append('..')
import helpers
log = helpers.log
from extractData import extractData

class DataParser:
  docId=0
  def __init__(self, siteName):
    self.siteName = siteName
    self.crawledFile = 'domains/' + siteName + '/' + siteName + '_crawled.txt'
    self.indexFile = FileIO.createSiteIndexFile(self.siteName)
    self.links = set()

  def runParser(self):
    if not os.path.isfile(self.crawledFile):
      log('error', 'No crawled file.')
      return self
    self.links = FileIO.fileToSet(self.crawledFile)
    if not self.links:
      log('error','Crawled file is empty')
      return self
    data = FileIO.readJsonFile(self.indexFile)
    for link in self.links:
      if link not in data:
        obj = extractData(link)
        data[link] = {
            'docId': DataParser.docId,
            'title': obj['title'],
            'body': obj['body'],
            'description': obj['description']
        }
        DataParser.docId+=1
    FileIO.deleteFileContents(self.indexFile)
    FileIO.writeJsonFile(data, self.indexFile)

if __name__ == "__main__":
  parser = DataParser('EpiCurious')
  parser.runParser()