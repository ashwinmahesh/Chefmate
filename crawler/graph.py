import json

class Graph:
  def __init__(self):
    self.nodes={}
  
  def addLink(self, nodeUrl, link):
    if nodeUrl not in self.nodes:
      self.nodes[nodeUrl]={}
    if nodeUrl != link:
      self.nodes[nodeUrl][link]=True
  
  def get(self, node):
    if node in self.nodes:
      return self.nodes[node]
    return set()
  
  def printGraph(self):
    print(json.dumps(self.nodes, indent=2))