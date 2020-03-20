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
    try:
      head=requests.head(parseLink)
      if ('content-type' not in head.headers and 'Content-type' not in head.headers) or ("text/html" not in head.headers['content-type'] and "text/xml" not in head.headers['Content-type']):
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

    page = requests.get(parseLink)
    contentType = 'content-type' if 'content-type' in head.headers else 'Content-type'
    if head.headers[contentType] == 'text/xml':
      return self.findNewLinksXML(parseLink, page)

    return self.findNewLinksHTML(parseLink, page)

  def findNewLinksXML(self, parseLink, page):
    soup = BeautifulSoup(page.content, 'xml')
    output = set()

    ##ISSUE - Need to update that base URL file
    for link in soup.find_all('loc'):
      href = link.text
      print(href)
      print(self.baseURL)

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

  def findNewLinksHTML(self, parseLink, page):
    soup = BeautifulSoup(page.content, 'lxml')
    output = set()
   
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
      self.crawled = FileIO.fileToSet(self.crawledFile)

      newLinks = set()
      newCrawledLinks = set()

      while(len(self.queue) != 0):
        nextLink = self.queue.pop()
        res = self.crawlPage(nextLink)
        newCrawledLinks.add(nextLink)
        newLinks = newLinks.union(res)

      FileIO.deleteFileContents(self.queueFile)
      FileIO.setToFile(newLinks, self.queueFile)
      FileIO.setToFile(newCrawledLinks, self.crawledFile)

    FileIO.writeJsonFile(self.outlinkGraph.nodes, self.outlinkGraphFile)
    FileIO.writeJsonFile(self.inlinkGraph.nodes, self.inlinkGraphFile)

    log('time', "Crawler for " + self.siteName + " execution Finished. Runtime: " + str(time.time() - startTime) + "seconds. Total links crawled: " + str(self.numCrawled))

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
  # crawler.runSpider(3)
  print(crawler.findNewLinks('https://www.simplyrecipes.com/recipes/cowboy_beans/%5d'))
  # print(crawler.findNewLinks('https://www.simplyrecipes.com/recipes/type/grill/low_carb/'))
  # print(crawler.findNewLinks('https://www.simplyrecipes.com/'))
  
