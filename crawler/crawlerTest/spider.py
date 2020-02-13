from fileIO import *
from linkFinder import LinkFinder

class Spider:
  siteName = ''
  baseURL = ''
  queueFile = ''
  crawledFile = ''
  queue = set()
  crawled = set()

  def __init__(self, siteName, baseURL, spiderNum=0):
    Spider.siteName = siteName
    Spider.baseURL = baseURL
    Spider.queueFile = siteName+'/'+siteName+'_queue.txt'
    Spider.crawledFile = siteName+'/'+siteName+'_crawled.txt'
    self.spiderNum = spiderNum
    
  def run(self):
    if self.spiderNum <= 1:
      createSiteFileSetup(self.siteName, self.baseURL)
    Spider.queue = fileToSet(Spider.queueFile)
    Spider.crawled = fileToSet(Spider.queueFile)
    # print('Queue:',Spider.queue)
    for i in range(0, 20):
      self.crawlPage(Spider.queue.pop())
  
  def crawlPage(self, pageLink):
    print(f"Spider {self.spiderNum} crawling {pageLink}. Queue: {len(Spider.queue)} | Crawled: {len(Spider.crawled)}")
    lf = LinkFinder(Spider.baseURL)
    Spider.crawled.add(pageLink)
    foundLinks = lf.findLinks(pageLink).getLinks()
    for link in foundLinks:
      if link[:len(Spider.baseURL)] == Spider.baseURL:
        Spider.queue.add(link)

if __name__ == '__main__':
  s = Spider('google', 'https://www.google.com', 1)
  s.run()