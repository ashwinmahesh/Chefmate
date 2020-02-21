from bs4 import BeautifulSoup
import requests
from urllib import parse
from fileIO import FileIO
import time

class Crawler:
  def __init__(self, siteName, baseURL):
    self.siteName = siteName
    self.baseURL = baseURL
    self.domainName = Crawler.getDomainName(baseURL)
    FileIO.createSiteFileSetup(self.siteName, self.baseURL)
    self.queueFile = siteName + '/' + siteName + '_queue.txt'
    self.crawledFile = siteName + '/' + siteName + '_crawled.txt'
    self.queue = set()
    self.crawled = set()
    self.numCrawled = 0

  def findNewLinks(self, parseLink):
    output = set()
    head = requests.head(parseLink)
    if "text/html" not in head.headers['content-type']:
      return set()
    page = requests.get(parseLink)
    soup = BeautifulSoup(page.content, 'html.parser')
    for link in soup.find_all('a'):
      href = link.get('href')
      if href is None or len(href) == 0:
        continue
      if href[0] == '/':
        output.add(self.baseURL + href)
      elif href[:len(self.baseURL)] == self.baseURL:
        output.add(href)
    return output

  def runSpider(self, iterations):
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

  def crawlPage(self, parseLink):
    self.crawled.add(parseLink)
    self.numCrawled += 1
    print("Crawling page " + parseLink)
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
  # crawler = Crawler('google', 'https://www.google.com/')
  startTime = time.time()
  crawler = Crawler('SimplyRecipes', 'https://www.simplyrecipes.com/')
  crawler.runSpider(5)
  print(
      "Execution Finished. Runtime: " + str(time.time() - startTime) + "seconds. Total links crawled: " + str(crawler.numCrawled))
