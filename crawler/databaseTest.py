from mongoengine import *
from mongoConfig import *
from os.path import exists
from shutil import rmtree
import json
import sys

def dumpTable(table):
  json_data = table.objects.to_json()
  json_object = json.loads(json_data)
  for entry in json_object:
    if(isinstance(table, Crawler)):
      entry['body'] = entry['body'][0 : 100]
    print("\n"+json.dumps(entry, indent=2))    

if __name__ == "__main__":
  if(len(sys.argv) < 2):
    print("Usage: python3 databaseTest.py <table_name: Crawler, User, or InvertedIndex>\n")
    exit()
  else:
    connect('chefmateDB', host='18.222.251.5', port=27017)
    if(str(sys.argv[1]) == "Crawler"):
        dumpTable(Crawler)
        exit()
    if(str(sys.argv[1]) == "User"):
        dumpTable(User)
        exit()
    if(str(sys.argv[1]) == "InvertedIndex"):
        dumpTable(InvertedIndex)
        exit()
    else:
        print("Usage: python3 databaseTest.py <table_name: Crawler, User, or InvertedIndex>\n")
        exit()
  #print(str(sys.argv[1]))
  #dumpTable(InvertedIndex)
  #dumpTable(Crawler)
  #dumpTable(User)

