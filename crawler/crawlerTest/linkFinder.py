from html.parser import HTMLParser
from urllib import parse
from bs4 import BeautifulSoup
import requests

class LinkFinder():
  def __init__(self, root):
    self.links=set()
    self.root = root
  
  def findLinkFromSite(self, startingLink=''):
    if startingLink == '':
      startingLink = self.root
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
  
  def showLinks(self):
    for link in self.links:
      print(link)

  # def handle_starttag(self, tag, attrs):
  #   if tag == 'a':
  #     for (attr, val) in attrs:
  #       print(attr, val)

lf = LinkFinder('https://youtube.com')
# lf.feed('<html><head><h1><a href=\'#\'>Link</a>Hello!</h1></head></html>')
lf.findLinkFromSite().showLinks()