from flask import Flask, jsonify, request

import requests
import sys
import time
sys.path.append('..')
sys.path.append('../crawler')
import helpers
log = helpers.log

from mongoengine import *
from mongoConfig import *
from cosineSimilarity import *
import rankerDBConfig
from loadInvertedIndexToMemory import loadInvertedIndexToMemory

app = Flask(__name__)

port = 8002
connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)

inMemoryTFIDF, crawlerReverseMap = loadInvertedIndexToMemory()

@app.route('/', methods=["GET"])
def index():
  return 'I am the ranker!'

@app.route('/query/<query>', methods=['GET'])
def rankQuery(query):
  log('Ranker', 'Received query: '+query)
  queryTerms = stemQuery(query)
  sortedDocIds=calculateAllCosineSimilarity(queryTerms, inMemoryTFIDF, crawlerReverseMap)
  return helpers.sendPacket(1, 'Successfully retrieved query', {'sortedDocIds':sortedDocIds})

@app.route('/fetchDocuments', methods=['POST'])
def fetchDocuments():
  startTime = time.time()
  docIds = request.json['docIds']
  log('ranker', 'Fetching documents')
  documents=[]
  for docId in docIds:
    documents.append(Crawler.objects.get(_id=str(docId)).to_json())
  log('ranker', 'Finished fetching documents in '+str(time.time() - startTime) + ' seconds')
  return helpers.sendPacket(1, 'Successfully retrieved documents', {'documents':documents})

#Insert Helper functions below here

if __name__ == "__main__":
  log('info', f"Ranker is listening on port {port}, {app.config['ENV']} environment.")
  app.run(debug=True, host='0.0.0.0', port=port)
