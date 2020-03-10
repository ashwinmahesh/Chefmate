from flask import Flask, jsonify

import requests
import sys
sys.path.append('..')
sys.path.append('../crawler')
import helpers
log = helpers.log
import numpy as np 

import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer 

from mongoengine import *
from mongoConfig import *
from cosineSimilarity import *

app = Flask(__name__)

port = 8002
connect('chefmateDB', host='18.222.251.5', port=27017)

@app.route('/', methods=["GET"])
def index():
  return 'I am the ranker!'

@app.route('/query/<query>', methods=['GET'])
def rankQuery(query):
  log('query', query)
  queryTerms = stemQuery(query)
  calculateAllCosineSimilarity(queryTerms, inMemoryTFIDF)
  return helpers.sendPacket(1, 'Successfully retrieved query', {'query':query})

@app.route('/testRoute')
def testRoute():
  return helpers.sendPacket(
      1, 'successfully got packet from ranker', {'name': 'Ashwin'})

#Insert Helper functions below here
def loadInvertedIndexToMemory():
  log('info', 'Loading Inverted Index into main memory.')
  invertedIndex = InvertedIndex.objects()
  inMemoryTFIDF= np.zeros((InvertedIndex.objects.count(), Crawler.objects.count()))

  for termEntry in invertedIndex:
    termNum = termEntry['termNum']
    docInfoList = termEntry['doc_info']
    for doc in docInfoList:
      docId = int(doc['docId'])
      inMemoryTFIDF[termNum][docId]=termEntry['tfidf'][str(docId)]

  return inMemoryTFIDF

def stemQuery(query):
  output=[]
  porterStemmer = PorterStemmer()
  tokenedText = word_tokenize(query)
  for word in tokenedText:
    output.append(porterStemmer.stem(word))
  return output

inMemoryTFIDF = loadInvertedIndexToMemory()

if __name__ == "__main__":
  log('info', f"Ranker is listening on port {port}, {app.config['ENV']} environment.")
  app.run(debug=True, host='0.0.0.0', port=port)
