from html.parser import HTMLParser
from urllib import parse
from bs4 import BeautifulSoup
import requests

class LinkFinder:
  def __init__(self, root):
    self.links=set()
    self.root = root
  
  def findLinks(self, startingLink):
    head = requests.head(startingLink)
    if "text/html" not in head.headers["content-type"]:
      return self
    page = requests.get(startingLink)
    soup = BeautifulSoup(page.content, 'html.parser')
    for link in soup.find_all('a'):
      href = link.get('href')
      if href==None:
        continue
      if href[0]=='/':
        self.links.add(self.root+href)
      else:
        self.links.add(href)
    return self
  
  def getLinks(self):
    return self.links

if __name__ == '__main__':
  lf = LinkFinder('https://youtube.com')