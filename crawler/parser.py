from urllib.request import urlopen
from bs4 import BeautifulSoup
from lxml import html
import requests

class Parser:

    def __init__(self, baseURL): 
        self.baseURL = baseURL

    def parse(self, baseURL):
        page = urlopen(baseURL).read()
        soup = BeautifulSoup(page, "html.parser")
        for node in soup.findAll('body'):
            print('\n'.join(node.findAll(text=True)))
        """body = soup.find('body')
        bodyContent = body.findChildren(recursive=False)
        soup2 = BeautifulSoup(bodyContent)
        bodyContent2 = soup2.get_text()
        print(bodyContent2)"""
        
        
        
if __name__ == "__main__":
    p = Parser("https://www.google.com/")
    p.parse("https://www.google.com/")