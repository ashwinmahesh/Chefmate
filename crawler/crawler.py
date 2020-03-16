from bs4 import BeautifulSoup
import requests
from urllib import parse
from fileIO import FileIO
import time
import sys
sys.path.append('..')
import helpers
log = helpers.log

from graph import Graph

class Crawler:
  def __init__(self, siteName, baseURL):
    self.siteName = siteName
    self.baseURL = baseURL
    self.domainName = Crawler.getDomainName(baseURL)
    FileIO.createSiteFileSetup(self.siteName, self.baseURL)
    self.queueFile = 'domains/' + siteName + '/' + siteName + '_queue.txt'
    self.crawledFile = 'domains/' + siteName + '/' + siteName + '_crawled.txt'
    self.queue = set()
    self.crawled = set()
    self.numCrawled = 0
    self.outlinkGraph = Graph()
    self.inlinkGraph = Graph()
    self.inlinkGraphFile = 'domains/' + siteName + '/' + siteName + '_inlinks.json'
    self.outlinkGraphFile = 'domains/' + siteName + '/' + siteName + '_outlinks.json'

  def findNewLinks(self, parseLink):
    output = set()
    head = requests.head(parseLink)
    if 'content-type' not in head.headers or "text/html" not in head.headers['content-type']:
      return set()
    page = requests.get(parseLink)
    soup = BeautifulSoup(page.content, 'html.parser')
    for link in soup.find_all('a'):
      href = link.get('href')
      if href is None or len(href) == 0:
        continue
      if href[0] == '/':
        output.add(self.baseURL + href)
        self.outlinkGraph.addLink(parseLink, self.baseURL + href)
        self.inlinkGraph.addLink(self.baseURL + href, parseLink)
      elif href[:len(self.baseURL)] == self.baseURL:
        output.add(href)
        self.outlinkGraph.addLink(parseLink, href)
        self.inlinkGraph.addLink(href, parseLink)

    return output

  def runSpider(self, iterations):
    startTime = time.time()
    for i in range(0, iterations):
      self.queue = FileIO.fileToSet(self.queueFile)
      FileIO.deleteFileContents(self.queueFile)
      self.crawled = FileIO.fileToSet(self.crawledFile)

      newLinks = set()
      newCrawledLinks = set()

      while(len(self.queue) != 0):
        nextLink = self.queue.pop()
        res = self.crawlPage(nextLink)
        newCrawledLinks.add(nextLink)
        newLinks = newLinks.union(res)

      FileIO.setToFile(newLinks, self.queueFile)
      FileIO.setToFile(newCrawledLinks, self.crawledFile)

    # FileIO.writeJsonFile(self.outlinkGraph.nodes, self.outlinkGraphFile)
    # FileIO.writeJsonFile(self.inlinkGraph.nodes, self.inlinkGraphFile)

    log('time', "Crawler execution Finished. Runtime: " + str(time.time() - startTime) + "seconds. Total links crawled: " + str(self.numCrawled))

  def crawlPage(self, parseLink):
    self.crawled.add(parseLink)
    self.numCrawled += 1
    log("crawler", parseLink)
    foundLinks = self.findNewLinks(parseLink)
    newLinks = set()
    for link in foundLinks:
      if link not in self.crawled and link not in self.queue:
        newLinks.add(link)
    return newLinks

  @staticmethod
  def getDomainName(url):
    try:
      results = getSubdomainName(url).split('.')
      return results[-2] + '.' + results[-1]
    except BaseException:
      return ''

  @staticmethod
  def getSubdomainName(url):
    try:
      return parse.urlparse(url).netloc
    except BaseException:
      return ''


if __name__ == "__main__":
  crawler = Crawler('simpleRecipes', 'https://www.simplyrecipes.com/')
  crawler.runSpider(3)
