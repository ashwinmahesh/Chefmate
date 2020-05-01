from bs4 import BeautifulSoup
import requests
import string
import re
import time
import sys
sys.path.append('..')
from helpers import log

def extractData(baseURL):
  log('parse', baseURL)
  startTime = time.time()

  headers = {'User-Agent':"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Mobile Safari/537.36"}

  page = requests.get(baseURL, headers=headers).content
  soup = BeautifulSoup(page, "lxml")
  title = soup.title.string if soup.title!=None else baseURL

  metaDesc = soup.find('meta', {'name':'description'})
  description = metaDesc.get('content') if metaDesc!=None else 'No description provided.'

  body=''
  for node in soup.findAll(['p', 'a', 'div', 'li']):
    body+=node.text+'\n'

  newLinks = soup.findAll('a')

  output = dict(link=baseURL, title=title, body=body, description=description, newLinks=newLinks)
  return output

if __name__ == "__main__":
  data = extractData("https://www.epicurious.com/type/salad")
  print(data['description'])

# TODO: For each link, get in links and out links, add to graph, and ultimately write to appropriate files. Use oldcrawler for reference.