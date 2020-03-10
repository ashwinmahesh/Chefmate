from flask import Flask, jsonify

import requests
# import json
import sys
sys.path.append('..')
sys.path.append('../crawler')
import helpers
log = helpers.log
import numpy as np 

from mongoengine import *
from mongoConfig import *

app = Flask(__name__)

port = 8002
connect('chefmateDB', host='18.222.251.5', port=27017)

@app.route('/', methods=["GET"])
def index():
  return 'I am the ranker!'

@app.route('/query/<query>', methods=['GET'])
def rankQuery(query):
  log('query', query)
  return helpers.sendPacket(1, 'Successfully retrieved query', {'query':query})

@app.route('/testRoute')
def testRoute():
  return helpers.sendPacket(
      1, 'successfully got packet from ranker', {'name': 'Ashwin'})

def loadInvertedIndexToMemory():
  invertedIndex = InvertedIndex.objects()
  inMemoryTFIDF= np.zeros((InvertedIndex.objects.count(), Crawler.objects.count()))

  for termEntry in invertedIndex:
    termNum = termEntry['termNum']
    docInfoList = termEntry['doc_info']
    for doc in docInfoList:
      docId = int(doc['docId'])
      inMemoryTFIDF[termNum][docId]=termEntry['tfidf'][str(docId)]

  return inMemoryTFIDF

if __name__ == "__main__":
  log('info', f"Ranker is listening on port {port}, {app.config['ENV']} environment.")
  loadInvertedIndexToMemory()
  app.run(debug=True, host='0.0.0.0', port=port)
