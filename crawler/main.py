from crawler import Crawler
from dataParser import DataParser
from databaseBuilder import DatabaseBuilder
from calculateTFIDF import calculateTFIDF
import time
from os.path import exists
from shutil import rmtree
import sys
sys.path.append('..')
import helpers
log = helpers.log

domains = [
    {'name': 'Tasty', 'root': 'https://tasty.co/'},
    {'name': 'SimplyRecipes', 'root': 'https://www.simplyrecipes.com/'},
    {'name': 'EpiCurious', 'root': 'https://www.epicurious.com/'},
    {'name': 'GoodFood', 'root': 'https://www.bbcgoodfood.com/'}
]

def buildIndex(iterations, reset=True, options={'crawl':True, 'parse':True, 'database':True, 'idf':True, 'tfidf':True}):
  log('build index', 'Running full suite of crawler programs.')
  programStartTime = time.time()

  if reset and exists('domains'):
    log('cleanup', 'Removing old domains folder')
    rmtree('./domains')

  reset and DatabaseBuilder.resetInvertedIndex() and DatabaseBuilder.resetCrawler()

  for domain in domains:
    domainStartTime = time.time()

    if options['crawl']:
      crawler = Crawler(domain['name'], domain['root'])
      crawler.runSpider(iterations)

    if options['parse']:
      dataParser = DataParser(domain['name'])
      dataParser.runParser()

    if options['database']:
      databaseBuilder = DatabaseBuilder(domain['name'], mode='DEV')
      databaseBuilder.build()

    log("time", domain['name']+" finished running in "+str(time.time()-domainStartTime)+" seconds.")
  
  options['idf'] and DatabaseBuilder.calculateIDF()
  options['tfidf'] and calculateTFIDF()
  log("time", "Program finished running in "+str(time.time()-programStartTime)+" seconds.")
   
if __name__ == "__main__":
  options = {
    'crawl':False,
    'parse':False,
    'database':False,
    'idf':False,
    'tfidf':True
  }
  buildIndex(2, reset=False, options=options)
