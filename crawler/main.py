import time
from os.path import exists
from shutil import rmtree
import sys
sys.path.append('..')
from helpers  import log
from getpass import getpass
import bcrypt

from crawler import Crawler
from dataParser import DataParser
from databaseBuilder import DatabaseBuilder
from calculateTFIDF import calculateTFIDF
from calculatePageRank import calculatePageRank

domains = [
    {'name': 'Tasty', 'root': 'https://tasty.co/'},
    {'name': 'SimplyRecipes', 'root': 'https://www.simplyrecipes.com/'},
    {'name': 'EpiCurious', 'root': 'https://www.epicurious.com/'},
]

loginPwd = '$2b$12$xteJc6kD6a3QSpi3MCHz5OyJWFY47uls8iw33Y.mwhqPtd168bOt.'.encode('UTF-8')

def buildIndex(iterations, reset=True, resetFiles=True, options={'crawl':True, 'pageRank': True, 'parse':True, 'database':True, 'idf':True, 'tfidf':True}, dev=True, passwordLock=True):
  log('build index', 'Running full suite of crawler programs.')
  programStartTime = time.time()

  loginSuccess = False
  if reset and passwordLock:
    log("info", "You are about to reset the database")
    pwd = getpass('Enter password to continue:').encode('UTF-8')
    if(bcrypt.checkpw(pwd, loginPwd)):
      loginSuccess = True
      log('login', 'Login successful. Resetting databases.')
    else:
      log('login', 'Login failed. Reset operation not performed')
  
  else:
    loginSuccess = True

  if resetFiles and exists('domains'):
    log('cleanup', 'Removing old domains folder')
    rmtree('./domains')

  reset and loginSuccess and DatabaseBuilder.resetInvertedIndex() and DatabaseBuilder.resetCrawler()

  for domain in domains:
    domainStartTime = time.time()

    if options['crawl']:
      crawler = Crawler(domain['name'], domain['root'])
      crawler.runSpider(iterations)

    options['pageRank'] and calculatePageRank(domain['name'], crawler.inlinkGraphFile, crawler.outlinkGraphFile, 3)

    if options['parse']:
      dataParser = DataParser(domain['name'])
      dataParser.runParser()

    if options['database']:
      databaseBuilder = DatabaseBuilder(domain['name'], mode='DEV' if dev else 'PROD')
      databaseBuilder.build()

    log("time", domain['name']+" finished running in "+str(time.time()-domainStartTime)+" seconds.")
  
  options['idf'] and DatabaseBuilder.calculateIDF()
  options['tfidf'] and calculateTFIDF()
  log("time", "Program finished running in "+str(time.time()-programStartTime)+" seconds.")
   
if __name__ == "__main__":
  options = {
    'crawl':True,
    'pageRank': True,
    'parse':False,
    'database':False,
    'idf':False,
    'tfidf':False
  }
  # buildIndex(1, reset=True, dev=False)
  buildIndex(1, reset=False, resetFiles=True, options=options, dev=False)
