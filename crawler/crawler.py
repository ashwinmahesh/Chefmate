from flask import Flask
from pymongo import MongoClient
import requests
import json

app = Flask(__name__)

port = 8001
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
  print(makeRequest("ranker", "testRoute"))
  return 'I am the crawler!'

@app.route('/testRoute')
def testRoute():
  return sendPacket(1, 'successfully got packet from crawler', {'name': 'Ashwin'})

#TODO UPDATE SERVER PATHS BASED ON CONFIG
def getServerPath(serverName):
  if serverName == 'ranker':
    return 'http://localhost:8002'
  elif serverName == 'client':
    return 'http://localhost:8000'
  else:
    return "ERROR"

def makeRequest(server, route, method="GET", data={}):
  serverPath = getServerPath(server)
  res='ERROR'
  if serverPath == 'ERROR':
    return res
  if method == 'GET':
    try:
      res=requests.get(f'{serverPath}/{route}', timeout=3)
      res.raise_for_status()
      res = res.content
    except requests.exceptions.HTTPError as errh:
        print ("Http Error:",errh)
    except requests.exceptions.ConnectionError as errc:
        print ("Error Connecting:",errc)
    except requests.exceptions.Timeout as errt:
        print ("Timeout Error:",errt)
    except requests.exceptions.RequestException as err:
        print ("Oops: Something Else",err)

  elif method == 'POST':
    try:
      res=requests.post(f'{serverPath}/{route}', data, timeout=3)
      res.raise_for_status()
      res=res.content
    except requests.exceptions.HTTPError as errh:
        print ("Http Error:",errh)
    except requests.exceptions.ConnectionError as errc:
        print ("Error Connecting:",errc)
    except requests.exceptions.Timeout as errt:
        print ("Timeout Error:",errt)
    except requests.exceptions.RequestException as err:
        print ("Oops: Something Else",err)
  
  if res=='ERROR':
    return res
  return json.loads(res.decode('utf-8'))

if __name__ == "__main__":
  print(f"Crawler is listening on port {port}")
  app.run(debug=True, host='0.0.0.0', port=port)