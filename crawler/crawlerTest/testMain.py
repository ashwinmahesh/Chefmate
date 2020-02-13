import threading
from queue import Queue
from spider import Spider
from linkFinder import LinkFinder
from fileIO import *
from domainParser import *

class Crawler:
  def __init__(self, websiteName, homepage, numThreads):
    self.websiteName = websiteName
    self.homepage = homepage
    self.domainName = getDomainName(homepage)
    self.queueFile = f"{websiteName}/{websiteName}_queue.txt"
    self.crawledFile = f"{websiteName}/{websiteName}_crawled.txt"
    self.numThreads = numThreads

    self.queue = Queue()
    Spider(websiteName, homepage, self.domainName)

  def launchSpiders(self):
    print("Launching spiders")
    for i in range(0, self.numThreads):
      print("Before first daemon")
      t = threading.Thread(target=self.work(i))
      t.daemon = True
      t.start()
  
  def work(self, spiderNum):
    while True:
      print(f"Spider crawling: {spiderNum}")
      url = self.queue.get()
      print("After getting")
      Spider.crawlPage(homepage, spiderNum)
      # Spider(self.websiteName, self.homepage, self.domainName, spiderNum).crawlPage(url)
      self.queue.task_done()

  def createJobs(self):
    print("Creating jobs")
    for link in fileToSet(self.queueFile):
      self.queue.put(link)
    self.queue.join()
    self.crawl()

  def crawl(self):
    queuedLinks = fileToSet(self.queueFile)
    if len(queuedLinks)==0:
      return
    print(f"{len(queuedLinks)} remaining in the queue")
    self.createJobs()

if __name__ == "__main__":
  c = Crawler('google', 'https://www.google.com/', 8)
  c.launchSpiders()
  c.crawl()
