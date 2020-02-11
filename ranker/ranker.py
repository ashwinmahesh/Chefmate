from flask import Flask, jsonify
from pymongo import MongoClient
import requests
import json
import sys
sys.path.append('..')
import helpers

app = Flask(__name__)

port = 8002
#TODO change this to deployed db
mongoUri = 'mongodb://localhost/chefmateDB'
mongoServer = MongoClient(mongoUri)
mongo = mongoServer.admin
try:
  mongo.command('isMaster')
  print("Connected successfully to database.")
except ConnectionError:
  print("Error: Database connection failed.")

@app.route('/', methods=["GET"])
def index():
  print(helpers.makeRequest("crawler", "testRoute"))
  return 'I am the ranker!'

@app.route('/testRoute')
def testRoute():
  return helpers.sendPacket(1, 'successfully got packet from ranker', {'name': 'Ashwin'})
  
if __name__ == "__main__":
  print(f"Ranker is listening on port {port}")
  app.run(debug=True, host='0.0.0.0', port=port)