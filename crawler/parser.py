import urllib2
from bs4 import BeautifulSoup

class Parser:

    def __init__(self, baseURL): 
        self.baseURL = baseURL

    def parse(self, baseURL):
        page = urllib2.urlopen(baseURL).read()
        soup = BeautifulSoup(page)
        body = soup.find('body')
        content = body.findChildren(recursive=False)