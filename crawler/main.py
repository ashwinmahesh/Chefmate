from crawler import Crawler
from dataParser import DataParser
from databaseBuilder import DatabaseBuilder
from mongoengine import *
from mongoConfig import *
import time
from os.path import exists
from shutil import rmtree
from pymongo import MongoClient
import sys
sys.path.append('..')
import helpers
log = helpers.log
import json

domains = [
    {'name': 'Tasty', 'root': 'https://tasty.co/'},
    {'name': 'SimplyRecipes', 'root': 'https://www.simplyrecipes.com/'},
    {'name': 'EpiCurious', 'root': 'https://www.epicurious.com/'},
    {'name': 'GoodFood', 'root': 'https://www.bbcgoodfood.com/'}
]

def buildIndex(iterations, reset=True):
  log('build index', 'Running full suite of crawler programs.')
  programStartTime = time.time()

  if exists('domains'):
    log('cleanup', 'Removing old domains folder')
    rmtree('./domains')

  reset and DatabaseBuilder.resetInvertedIndex()

  for domain in domains:
    domainStartTime = time.time()

    crawler = Crawler(domain['name'], domain['root'])
    crawler.runSpider(iterations)

    dataParser = DataParser(domain['name'])
    dataParser.runParser()

    databaseBuilder = DatabaseBuilder(domain['name'], mode='DEV')
    databaseBuilder.build()

    log("time", domain['name']+" finished running in "+str(time.time()-domainStartTime)+" seconds.")
  
  DatabaseBuilder.calculateIDF()
  log("time", "Program finished running in "+str(time.time()-programStartTime)+" seconds.")



if __name__ == "__main__":
  json_data = Crawler.objects.to_json()
  json_object = json.loads(json_data)
  for entry in json_object:
    entry['body'] = entry['body'][0 : 100]
    print("\n"+json.dumps(entry, indent=2))
  #buildIndex(1, reset=False)
