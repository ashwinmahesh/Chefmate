from bs4 import BeautifulSoup
from lxml import html
import requests
import nltk
import string
import re

def extractData(baseURL):
  page = requests.get(baseURL).content
  soup = BeautifulSoup(page, "html.parser")
  parsed = ""
  parsed2 = ""
  title = soup.title
  title = title.string #title contains the title of the page at this point Ex: "Google"

  for node in soup.findAll('body'):
      parsed = ('\n'.join(node.findAll(text=True)))

  parsed = parsed.splitlines()

  """For loop parses the text within the document to only have the necessary information. 
  Parsed2 will contain the shortened version"""

  for s in parsed: 
      if not('function()' in s or "();" in s): 
          parsed2 += s

  contents = parsed2.split(' ')

  """stoping and stemming below - contents will contain final list of words after stopping and stemming"""

  nltk.download('stopwords')
  contents = [content.lower() for content in contents]
  table = str.maketrans('', '', string.punctuation)
  contents = [content.translate(table) for content in contents]
  contents = [re.sub(r'\d+', '', content) for content in contents]
  stopwords = set(nltk.corpus.stopwords.words('english'))
  contents = [[word for word in content.split() if word not in stopwords] for content in contents]

  stems = nltk.stem.PorterStemmer()
  contents = [" ".join([stems.stem(word) for word in content]) for content in contents]
  contents = list(filter(lambda x : x != '', contents))

  output = dict(link=baseURL, title=title, body=contents)
  
  return output
        
if __name__ == "__main__":
    print(parse("https://www.google.com/"))
    # print(parse("https://www.simplyrecipes.com/recipes/beignets/"))