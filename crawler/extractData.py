from bs4 import BeautifulSoup
import requests
import string
import re
import time
import sys
sys.path.append('..')
from helpers import log

#TODO need to do something else if XML
def extractData(baseURL):
  log('parse', baseURL)
  startTime = time.time()

  page = requests.get(baseURL).content
  soup = BeautifulSoup(page, "lxml")
  title = soup.title.string if soup.title!=None else baseURL

  metaDesc = soup.find('meta', {'name':'description'})
  description = metaDesc.get('content') if metaDesc!=None else 'No description provided.'

  body=''
  for node in soup.findAll(['p', 'a']):
    body+=node.text+'\n'

  output = dict(link=baseURL, title=title, body=body, description=description)
  return output
        
if __name__ == "__main__":
    extractData("https://www.simplyrecipes.com/recipes/cuisine/indian/")