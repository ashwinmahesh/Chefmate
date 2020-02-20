import urllib2
from bs4 import BeautifulSoup

class Parser:

    def __init__(self, baseURL): 
        self.baseURL = baseURL

    def parse(self, baseURL):
        page = urllib2.urlopen(baseURL).read()
        soup = BeautifulSoup(page)
        titles = soup.find('title')
        headers = soup.find('head')
        body = soup.find('body')
        bodyContent = body.findChildren(recursive=False)
        titleContent = titles.findChildren(recursive=False)
        headContent = titles.findCHildren(recursive=False)