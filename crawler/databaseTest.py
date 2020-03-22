from mongoengine import *
from mongoConfig import *
from os.path import exists
from shutil import rmtree
import json
import sys

def dumpTable(x):
  if (x == "User"):
    json_data = User.objects.to_json()
  elif (x == "Crawler"):
    json_data = Crawler.objects.to_json()
  elif (x == "InvertedIndex"):
    json_data = InvertedIndex.objects.to_json()
  elif (x == "Query"):
    json_data = Query.objects.to_json()
  
  json_object = json.loads(json_data)

  for entry in json_object:
    if(x == "Crawler"):
      entry['body'] = entry['body'][0 : 100]
    print("\n"+json.dumps(entry, indent=2))

if __name__ == "__main__":
  if(len(sys.argv) < 2):
    print("Usage: python3 databaseTest.py <table_name: Crawler, User, or InvertedIndex>\n")
    exit()
  if((str(sys.argv[1]) != "Crawler") & (str(sys.argv[1]) != "User") & (str(sys.argv[1]) != "InvertedIndex") and (str(sys.argv[1]) != "Query")):
    print("Usage: python3 databaseTest.py <table_name: Crawler, User, or InvertedIndex>\n")
    exit()
  else:
    connect(databaseName, host=databaseAddr, port=27017)
    dumpTable(str(sys.argv[1]))
