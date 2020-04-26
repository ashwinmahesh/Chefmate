from fileIO import FileIO
import json
import os
import sys
sys.path.append('..')
import helpers
log = helpers.log
from extractData import extractData

from threading import Thread

class DataParser:
  MAX_BUFFER_LEN = 10

  def __init__(self, siteName, threads):
    self.siteName = siteName
    self.crawledFile = 'domains/' + siteName + '/' + siteName + '_crawled.txt'
    self.indexFile = FileIO.createSiteIndexFile(self.siteName)
    self.links = set()
    self.linksList = None
    self.readSemaphore = True
    self.writeSemaphore = True
    self.MAX_THREADS = threads

  def parserWorker(self):
    buffer = []
    while(len(self.linksList) > 0):
      while(not self.readSemaphore):
        pass

      self.readSemaphore = False
      start = len(self.linksList) - DataParser.MAX_BUFFER_LEN - 1 if len(self.linksList) > DataParser.MAX_BUFFER_LEN else 0
      end = len(self.linksList)
      toParse = self.linksList[start : end]
      del self.linksList[start : end]
      self.readSemaphore = True

      for link in toParse:
        obj = extractData(link)
        buffer.append('link: ' + link + '\n')

        title = obj['title'] if obj['title']!=None else self.siteName
        buffer.append('title: ' + title+ '\n')

        buffer.append('description: ' + obj['description']+ '\n',)

        beforeCleanupBody = obj['body'].replace('\n', ' ')
        afterCleanupBody = ' '.join(beforeCleanupBody.split())
        buffer.append('body: ' + afterCleanupBody + '\n\n')
      
      while(not self.writeSemaphore):
        pass
      self.writeSemaphore = False
      FileIO.writeToFile(self.indexFile, "".join(buffer))
      self.writeSemaphore = True
      buffer[:] = []

  def runParser(self):
    FileIO.deleteFileContents(self.indexFile)

    if not os.path.isfile(self.crawledFile):
      log('error', 'No crawled file.')
      return self
    
    self.links = FileIO.fileToSet(self.crawledFile)
    self.linksList = list(self.links)

    if not self.links:
      log('error','Crawled file is empty')
      return self
    
    threadPool = []
    for i in range(0, self.MAX_THREADS):
      newThread = Thread(name='parser_'+str(i), target=self.parserWorker)
      threadPool.append(newThread)
    
    for i in range(0, self.MAX_THREADS):
      threadPool[i].start()
    
    for i in range(0, self.MAX_THREADS):
      threadPool[i].join()

if __name__ == "__main__":
  parser = DataParser('EpiCurious')
  parser.runParser()
