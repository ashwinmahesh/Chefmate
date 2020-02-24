from crawler import Crawler
from flask import Flask, jsonify
from pymongo import MongoClient
import requests
import json
import sys
sys.path.append('..')
import helpers

log = helpers.log

app = Flask(__name__)

port = 8001

mongoUri = 'mongodb://18.222.251.5/chefmateDB'  # 'mongodb://localhost/chefmateDB'
mongoServer = MongoClient(mongoUri)
mongo = mongoServer.admin
try:
  mongo.command('isMaster')
  log("info", 'Connected successfully to database.')
except ConnectionError:
  log('error', 'Database connection failed.')

# database = 

@app.route('/', methods=["GET"])
def index():
  print(helpers.makeRequest("ranker", "testRoute"))
  return 'I am the crawler!'

@app.route('/testRoute')
def testRoute():
  return helpers.sendPacket(
      1, 'successfully got packet from crawler', {'name': 'Ashwin'})


if __name__ == "__main__":
  log('info', f"Crawler is listening on port {port}, {app.config['ENV']} environment.")
  app.run(debug=True, host='0.0.0.0', port=port)
