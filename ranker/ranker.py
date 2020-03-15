from flask import Flask, jsonify, request

import requests
import sys
sys.path.append('..')
sys.path.append('../crawler')
import helpers
log = helpers.log

from mongoengine import *
from mongoConfig import *
from cosineSimilarity import *

app = Flask(__name__)

port = 8002
connect('chefmateDB', host='18.222.251.5', port=27017)

inMemoryTFIDF = loadInvertedIndexToMemory()

@app.route('/', methods=["GET"])
def index():
  return 'I am the ranker!'

@app.route('/query/<query>', methods=['GET'])
def rankQuery(query):
  log('Ranker', 'Received query: '+query)
  queryTerms = stemQuery(query)
  sortedDocIds=calculateAllCosineSimilarity(queryTerms, inMemoryTFIDF)
  return helpers.sendPacket(1, 'Successfully retrieved query', {'sortedDocIds':sortedDocIds})

@app.route('/fetchDocuments', methods=['POST'])
def fetchDocuments():
  docIds = request.json['docIds']
  log('ranker', 'Fetching documents')
  documents=[]
  for docId in docIds:
    documents.append(Crawler.objects.get(_id=str(docId)).to_json())
  return helpers.sendPacket(1, 'Successfully retrieved documents', {'documents':documents})

#Insert Helper functions below here

if __name__ == "__main__":
  log('info', f"Ranker is listening on port {port}, {app.config['ENV']} environment.")
  app.run(debug=True, host='0.0.0.0', port=port)
