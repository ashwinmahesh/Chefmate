from fileIO import *
from linkFinder import LinkFinder

class Spider:
  siteName = ''
  baseURL = ''
  queueFile = ''
  crawledFile = ''
  domainName = ''
  queue = set()
  crawled = set()

  def __init__(self, siteName, baseURL, domainName, spiderNum=0):
    Spider.siteName = siteName
    Spider.baseURL = baseURL
    Spider.queueFile = siteName+'/'+siteName+'_queue.txt'
    Spider.crawledFile = siteName+'/'+siteName+'_crawled.txt'
    Spider.domainName = domainName
    self.spiderNum = spiderNum
    self.run()
    
  def run(self):
    if self.spiderNum <= 1:
      createSiteFileSetup(self.siteName, self.baseURL)
    Spider.queue = fileToSet(Spider.queueFile)
    Spider.crawled = fileToSet(Spider.queueFile)
    Spider.crawlPage(self.baseURL, self.spiderNum)
    # self.crawlPage(Spider.queue.pop())
    # for i in range(0, 20):
    #   self.crawlPage(Spider.queue.pop())

  @staticmethod
  def updateFiles():
    setToFile(Spider.queue, Spider.queueFile)
    setToFile(Spider.crawled, Spider.crawledFile)
  
  @staticmethod
  def crawlPage(pageLink, spiderNum=0):
    print(f"Spider {spiderNum} crawling {pageLink}. Queue: {len(Spider.queue)} | Crawled: {len(Spider.crawled)}")
    lf = LinkFinder(Spider.baseURL)
    Spider.crawled.add(pageLink)
    foundLinks = lf.findLinks(pageLink).getLinks()
    for link in foundLinks:
      # if Spider.domainName in link and link not in Spider.crawled:
      if link[:len(Spider.baseURL)] == Spider.baseURL and link not in Spider.crawled:
        Spider.queue.add(link)
    Spider.updateFiles()
    
if __name__ == '__main__':
  s = Spider('google', 'https://www.google.com', 'https://www.google.com', 1)
  s.run()