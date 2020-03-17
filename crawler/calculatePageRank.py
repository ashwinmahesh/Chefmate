import time
import sys
# sys.path.append('..')
sys.path.append('../..')

from Chefmate.crawler.fileIO import FileIO
from Chefmate.crawler.graph import Graph
from Chefmate.helpers import log

def calculatePageRanks(domain, inlinkGraphFile, outlinkGraphFile):
  startTime = time.time()
  inlinkGraph = Graph(FileIO.readJsonFile(inlinkGraphFile))
  outlinkGraph = Graph(FileIO.readJsonFile(outlinkGraphFile))
  outlinkGraph.printGraph()
  inlinkGraph.printGraph()

  log('time', 'Page rank calculation for ' + domain + ' completed in ' + str(time.time()-startTime) + ' seconds')

if __name__ == '__main__':
  calculatePageRanks('Tasty', './domains/Tasty/Tasty_inlinks.json', './domains/Tasty/Tasty_outlinks.json')