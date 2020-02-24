from crawler import Crawler
from dataParser import DataParser
from databaseBuilder import DatabaseBuilder
import time
import os

domains = [
    {'name': 'Tasty', 'root': 'https://tasty.co/'},
    {'name': 'SimplyRecipes', 'root': 'https://www.simplyrecipes.com/'},
    {'name': 'EpiCurious', 'root': 'https://www.epicurious.com/'},
    {'name': 'GoodFood', 'root': 'https://www.bbcgoodfood.com/'}
]

def buildIndex(iterations):
  log('build index', 'Running full suite of crawler programs.')
  programStartTime = time.time()
  if os.path.exists('domains'):
    log('cleanup', 'Removing old domains folder')
    os.rmdir('domains')
  for domain in domains:
    domainStartTime = time.time()
    crawler = Crawler(domain['name'], domain['root'])
    crawler.runSpider(iterations)
    dataParser = DataParser(domain['name'])
    dataParser.runParser()
    databaseBuilder = DatabaseBuilder(domain['name'])
    databaseBuilder.build()
    log("time", domain['name']+" finished running in "+str(time.time()-domainStartTime)+" seconds.")
  
  DatabaseBuilder.calculateIDF()
  log("time", "Program finished running in "+str(time.time()-programStartTime)+" seconds.")

if __name__ == "__main__":
  buildIndex(1)
