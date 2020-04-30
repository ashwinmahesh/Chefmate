from flask import Flask, jsonify, request
import sys
sys.path.append('..')
sys.path.append('../crawler')
sys.path.append('../ranker')
import requests
import time
import numpy as np
import rankerDBConfig

from helpers import *

from mongoengine import *
from mongoConfig import *

from initialize import initialize
from knn import findKNearestNeighbors

app = Flask(__name__)
port = 8003

connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)
userMatrix, userReverseMap, documentReverseMap = initialize()
K_VALUE = 5

###For testing
findKNearestNeighbors(K_VALUE, username='mahesh.ashwin1998@gmail.com', userIndex=userReverseMap['mahesh.ashwin1998@gmail.com'], userMatrix=userMatrix)

@app.route('/', methods=['GET'])
def index():
  return 'Recommender server loaded successfully'

@app.route('/calculateKNN', methods=['POST'])
def performKNN():
  user = request.json['user']
  findKNearestNeighbors()
  return sendPacket(1, 'Successfully calculated ')

if __name__ == '__main__':
  log('info', "Recommender is listening on port "+str(port) +", " + str(app.config['ENV']) + " environment.")
  app.run(debug=True, host='0.0.0.0', port=port)