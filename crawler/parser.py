from urllib.request import urlopen
from bs4 import BeautifulSoup
from lxml import html
import requests
import nltk
import string
import re

class Parser:

    def __init__(self, baseURL): 
        self.baseURL = baseURL

    def parse(self, baseURL):

        page = urlopen(baseURL).read()
        soup = BeautifulSoup(page, "html.parser")
        parsed = ""
        parsed2 = ""
        title = soup.title
        title = title.string #title contains the title of the page at this point Ex: "Google"

        for node in soup.findAll('body'):
            parsed = ('\n'.join(node.findAll(text=True)))

        parsed = parsed.splitlines()
        #print(parsed)

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

        finalContents = []
        dictionary = dict(link=baseURL, title=title, body=contents)
        finalContents.append(dictionary)
       
        return finalContents
        

        """body = soup.find('body')
        bodyContent = body.findChildren(recursive=False)
        soup2 = BeautifulSoup(bodyContent)
        bodyContent2 = soup2.get_text()
        print(bodyContent2)"""
        
        
        
if __name__ == "__main__":
    p = Parser("https://www.google.com/")
    p.parse("https://www.google.com/")