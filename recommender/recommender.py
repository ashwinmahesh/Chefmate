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

app = Flask(__name__)
port = 8003

connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)

@app.route('/', methods=['GET'])
def index():
  return 'Recommender server loaded successfully'


if __name__ == '__main__':
  log('info', "Recommender is listening on port "+str(port) +", " + str(app.config['ENV']) + " environment.")
  app.run(debug=True, host='0.0.0.0', port=port)