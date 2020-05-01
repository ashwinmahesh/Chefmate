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
from addSpecialChars import addSpecialChars

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

inMemoryTFIDF, invertedIndex, crawlerReverseMap, termReverseMap, pageRanks, authority = loadInvertedIndexToMemory()
stopwords = set(nltk.corpus.stopwords.words('english'))

QUERY_EXPANSION = False
PSEUDO_RELEVANCE_FEEDBACK = False

@app.route('/', methods=["GET"])
def index():
  return 'I am the ranker!'

@app.route('/query/<query>', methods=['POST'])
def rankQuery(query):
  log('Ranker', 'Received query: '+query)

  uLikes = request.json['userLikes']
  uDislikes = request.json['userDislikes']

  fixed_uLikes = []
  fixed_dislikes = []

  for link, value in uLikes.items():
    if not isinstance(value, bool):
      fixed_uLikes.append((link, value))

  for link, value in uDislikes.items():
    if not isinstance(value, bool):
      fixed_dislikes.append((link, value))

  corrected_uLikes = { k.replace("%114", '.'): v.replace("%20", ' ') for k, v in fixed_uLikes }
  corrected_uDislikes = { k.replace('%114', '.'): v.replace("%20", ' ') for k, v in fixed_dislikes }

  index = query.find(":")
  if index == -1: 
    excludedTerms = []
    pureQuery = query
  else:
    excludedTerms = stemQuery(query[index+1:len(query)], stopwords)
    pureQuery = query[0:index]

  queryTerms = stemQuery(pureQuery, stopwords)

  addSpecialChars(queryTerms)
  rankResults  = rank(corrected_uLikes, corrected_uDislikes, query, queryTerms, excludedTerms, termReverseMap, invertedIndex, inMemoryTFIDF, crawlerReverseMap, queryExpansion=QUERY_EXPANSION, pseudoRelevanceFeedback=PSEUDO_RELEVANCE_FEEDBACK)
  sortedDocUrls = rankResults[0]
  didUMeanStr = rankResults[1]

  log("Ranked", 'Ranked '+str(len(sortedDocUrls)) +' documents.')
  return sendPacket(1, 'Successfully retrieved query', {
    'sortedDocUrls':sortedDocUrls[0:200],
    'didUMeanStr': didUMeanStr
  })

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
