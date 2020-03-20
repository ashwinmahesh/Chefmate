from bs4 import BeautifulSoup
import requests
import string
import re

#TODO need to do something else if XML
def extractData(baseURL):
  page = requests.get(baseURL).content
  soup = BeautifulSoup(page, "lxml")
  title = soup.title.string if soup.title!=None else baseURL

  body=''
  for node in soup.findAll(['p', 'a']):
    body+=node.text+'\n'

  output = dict(link=baseURL, title=title, body=body)
  
  return output
        
if __name__ == "__main__":
    extractData("https://www.simplyrecipes.com/recipes/beignets/")