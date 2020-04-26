from fileIO import FileIO
import json
import os
import sys
sys.path.append('..')
import helpers
log = helpers.log
from extractData import extractData

class DataParser:
  MAX_BUFFER_LEN = 10

  def __init__(self, siteName):
    self.siteName = siteName
    self.crawledFile = 'domains/' + siteName + '/' + siteName + '_crawled.txt'
    self.indexFile = FileIO.createSiteIndexFile(self.siteName)
    self.links = set()

  def runParser(self):
    buffer = []
    FileIO.deleteFileContents(self.indexFile)

    if not os.path.isfile(self.crawledFile):
      log('error', 'No crawled file.')
      return self
    
    self.links = FileIO.fileToSet(self.crawledFile)
    if not self.links:
      log('error','Crawled file is empty')
      return self

    i = 0

    for link in self.links:
      if i >= 10:
        break

      obj = extractData(link)
      buffer.append('link: ' + link + '\n')
      buffer.append('title: ' + obj['title']+ '\n')
      buffer.append('description: ' + obj['description']+ '\n',)
      buffer.append('body: ' + obj['body'].replace('\n', ' ') + '\n\n')

      if(len(buffer) == 4 * DataParser.MAX_BUFFER_LEN):
        FileIO.writeToFile(self.indexFile, "".join(buffer))
        buffer[:] = []
    
      i += 1

    if(len(buffer) > 0):
      FileIO.writeToFile(self.indexFile, "".join(buffer))
      buffer[:] = []

if __name__ == "__main__":
  parser = DataParser('EpiCurious')
  parser.runParser()
