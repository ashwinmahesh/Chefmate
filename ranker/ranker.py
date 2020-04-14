from flask import Flask, jsonify, request
import sys
sys.path.append('..')
sys.path.append('../crawler')

import requests
import time

from helpers import *

from mongoengine import *
from mongoConfig import *

from rankDocuments import rank
from stemQuery import stemQuery
import rankerDBConfig
from loadInvertedIndexToMemory import loadInvertedIndexToMemory

import ssl
import nltk

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('stopwords', quiet=True)
nltk.download('punkt', quiet=True)

app = Flask(__name__)

port = 80 if app.config['ENV']=='production' else 8002
connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)

# inMemoryTFIDF, crawlerReverseMap, termReverseMap, pageRanks, authority = loadInvertedIndexToMemory()
termReverseMap = loadInvertedIndexToMemory()

@app.route('/', methods=["GET"])
def index():
  return 'I am the ranker!'

@app.route('/query/<query>', methods=['GET'])
def rankQuery(query):
  log('Ranker', 'Received query: '+query)
  queryTerms = stemQuery(query)
  # sortedDocUrls=rank(queryTerms, inMemoryTFIDF, crawlerReverseMap, termReverseMap, pageRanks, authority)
  sortedDocUrls = rank(queryTerms, termReverseMap)
  return sendPacket(1, 'Successfully retrieved query', {'sortedDocUrls':sortedDocUrls})

@app.route('/fetchDocuments', methods=['POST'])
def fetchDocuments():
  startTime = time.time()
  docUrls = request.json['docUrls']
  log('ranker', 'Fetching documents')
  documents=[]
  for url in docUrls:
    try:
      document = Crawler.objects.get(url=url).to_json()
      documents.append(document)
    except DoesNotExist:
      log("error", 'Undefined document url present')

  log('ranker', 'Finished fetching documents in '+str(time.time() - startTime) + ' seconds')
  return sendPacket(1, 'Successfully retrieved documents', {'documents':documents})

if __name__ == "__main__":
  log('info', "Ranker is listening on port "+str(port) +", " + str(app.config['ENV']) + " environment.")
  app.run(debug=True, host='0.0.0.0', port=port)
