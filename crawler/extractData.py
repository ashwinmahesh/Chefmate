from bs4 import BeautifulSoup
import requests
import string
import re
import time
import sys
sys.path.append('..')
from helpers import log

def extractData(baseURL):
  log('parse', baseURL)
  startTime = time.time()

  headers = {'User-Agent':"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Mobile Safari/537.36"}

  page = requests.get(baseURL, headers=headers).content
  soup = BeautifulSoup(page, "lxml")
  title = soup.title.string if soup.title!=None else baseURL

  metaDesc = soup.find('meta', {'name':'description'})
  description = metaDesc.get('content') if metaDesc!=None else 'No description provided.'

  body=''
  for node in soup.findAll(['p', 'a', 'div', 'li']):
    body+=node.text+'\n'

  output = dict(link=baseURL, title=title, body=body, description=description)
  return output

if __name__ == "__main__":
    data = extractData("https://www.epicurious.com/type/salad")
    print(data['description'])

# TODO: For each link, get in links and out links, add to graph, and ultimately write to appropriate files. Use oldcrawler for reference.

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

#Finding in-links and out-links for each page used to be done in crawler (this file). When we updated the crawler, we made it so it "just checks the site map rather than going page by page".
#So I need to do this in-link and out-link finding in extractData or whatever (the file I'm working on).

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
