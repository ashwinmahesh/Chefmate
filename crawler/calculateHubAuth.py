import time
import sys
sys.path.append('../..')

from Chefmate.crawler.fileIO import FileIO
from Chefmate.crawler.graph import Graph
from Chefmate.helpers import log
def hasConnection(page, otherPage, edges): 
    if(page == otherPage): 
      return False

    for x in edges: 
      if otherPage == x: 
        return True

    return False

def calculateHubAuth(domain:str, inlinkGraphFile:str, outlinkGraphFile:str, iterations:int, lambdaVar:float=0.0001, testMode=False):
  startTime = time.time()
  log("Hits", "Hits calculation started")
  inlinkGraph = Graph(FileIO.readJsonFile(inlinkGraphFile))
  outlinkGraph = Graph(FileIO.readJsonFile(outlinkGraphFile))

  pages = set(outlinkGraph.nodes.keys()).union(inlinkGraph.nodes.keys())
  pageLength = len(pages)

  authority = [{}]
  hub = [{}]
  
  for page in pages: 
    authority[0][page] = 1.0
    hub[0][page] = 1.0

  
  for i in range(1, iterations + 1): 
    authority.append({})
    hub.append({})
    for page in pages:
      authority[i][page] = 0.0
      hub[i][page] = 0.0
      
      
    zAuth = 0.0
    zHub = 0.0

    for page in pages:
      inlinkEdges = inlinkGraph.get(page).keys()
      outlinkEdges = outlinkGraph.get(page).keys()
      for otherPage in pages:
        if hasConnection(page, otherPage, outlinkEdges):
          hub[i][page] += authority[i-1][otherPage]
          zHub += authority[i-1][otherPage]
        if hasConnection(page, otherPage, inlinkEdges):
          authority[i][page] += hub[i-1][otherPage]
          zAuth += hub[i-1][otherPage]
    
    for page in pages:
        if zAuth > 0:
          authority[i][page] = authority[i][page] / zAuth
        if zHub > 0:
          hub[i][page] = hub[i][page] / zHub

    result = {}

  for page in pages: 
    hubAuth = []
    hubAuth.append(hub[i].get(page))
    hubAuth.append(authority[i].get(page))
    result[page] = hubAuth

  not testMode and FileIO.writeJsonFile(result, 'domains/' + domain + '/' + domain + '_HubAuth.json')
  log('time', 'Hits calculation for ' + domain + ' completed in ' + str(time.time()-startTime) + ' seconds')

  return authority[iterations], hub[iterations]

if __name__ == '__main__':
  # pageRanks = calculatePageRank(domain='Tasty', 
  #   inlinkGraphFile='./domains/Tasty/Tasty_inlinks.json', 
  #   outlinkGraphFile='./domains/Tasty/Tasty_outlinks.json', 
  #   iterations=3
  # )
  calculateHubAuth(domain='test', inlinkGraphFile='./test/inlinks.json', outlinkGraphFile='./test/outlinks.json', iterations=3, testMode=True)
  #print('Hub_Authority:', Hub_Auth)