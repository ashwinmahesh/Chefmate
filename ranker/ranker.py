from flask import Flask
from pymongo import MongoClient
import requests
import json

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
  print(makeRequest("client", "testRoute"))
  return 'I am the ranker!'

#TODO UPDATE SERVER PATHS BASED ON CONFIG
def getServerPath(serverName):
  if serverName == 'crawler':
    return 'http://localhost:8001'
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
  print(f"Ranker is listening on port {port}")
  app.run(debug=True, host='0.0.0.0', port=port)