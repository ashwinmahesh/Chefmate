from fileIO import FileIO
import json
import os
import sys
sys.path.append('..')
import helpers
log = helpers.log
import requests

from extractData import extractData
from threading import Thread
from graph import Graph
from bs4 import BeautifulSoup

class DataParser:
  MAX_BUFFER_LEN = 10

  def __init__(self, siteName, baseURL, threads):
    self.siteName = siteName
    self.baseURL = baseURL
    self.crawledFile = 'domains/' + siteName + '/' + siteName + '_crawled.txt'
    self.indexFile = FileIO.createSiteIndexFile(self.siteName)
    self.links = set()
    self.linksList = None
    self.readSemaphore = True
    self.writeSemaphore = True
    self.MAX_THREADS = threads
    self.inlinkGraph = Graph()
    self.outlinkGraph = Graph()
    self.inlinkGraphFile = 'domains/' + siteName + '/' + siteName + '_inlinks.json'
    self.outlinkGraphFile = 'domains/' + siteName + '/' + siteName + '_outlinks.json'

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
        self.findNewLinks(link)

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

    FileIO.writeJsonFile(self.outlinkGraph.nodes, self.outlinkGraphFile)
    FileIO.writeJsonFile(self.inlinkGraph.nodes, self.inlinkGraphFile)

  def findNewLinks(self, parseLink):
    try:
      head=requests.head(parseLink)
      if ('content-type' not in head.headers and 'Content-type' not in head.headers) or ("text/html" not in head.headers['content-type'] and "text/html" not in head.headers['Content-type']):
        log("error", 'Invalid page type')
        return set()
    except requests.exceptions.HTTPError as errh:
      log('error', 'HTTPError')
      return set()
    except requests.exceptions.ConnectionError as errc:
      log('error', 'ConnectionError')
      return set()
    except requests.exceptions.Timeout as errt:
      log('error', 'Timeout Error')
      return set()
    except requests.exceptions.RequestException as err:
      log('error', 'Request exception')
      return set()

    headers = {'User-Agent':"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Mobile Safari/537.36"}
    page = requests.get(parseLink, headers=headers)
    
    return self.findNewLinksHTML(parseLink, page)

  def findNewLinksHTML(self, parseLink, page):
    soup = BeautifulSoup(page.content, 'lxml')
   
    for link in soup.find_all('a'):
      href = link.get('href')

      if href is None or len(href) == 0:
        continue

      if href[0] == '/':
        self.outlinkGraph.addLink(parseLink, self.baseURL + href)
        self.inlinkGraph.addLink(self.baseURL + href, parseLink)

      elif href[:len(self.baseURL)] == self.baseURL:
        self.outlinkGraph.addLink(parseLink, href)
        self.inlinkGraph.addLink(href, parseLink)

if __name__ == "__main__":
  parser = DataParser('EpiCurious', 'https://www.epicurious.com/')
  parser.runParser()
