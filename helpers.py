import requests
import json

#TODO UPDATE SERVER PATHS BASED ON CONFIG
def getServerPath(serverName):
  if serverName == 'client':
    return 'http://localhost:8000'
  elif serverName == 'crawler':
    return 'http://localhost:8001'
  elif serverName == 'ranker':
    return 'http://localhost:8002'
  else:
    return "ERROR"

def sendPacket(success:int, message:str, content={}):
  return {'success': success, 'message': message, 'content': content}


def makeRequest(server, route, method="GET", data={}):
  serverPath = getServerPath(server)
  res='ERROR'
  if serverPath == 'ERROR':
    print("Error: Invalid server path")
    return res
  if method == 'GET':
    try:
      res=requests.get(serverPath+'/'+route, timeout=3)
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
      res=requests.post(serverPath+'/'+route, data, timeout=3)
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

def log(title, message):
  print('['+title.upper()+'] '+message)