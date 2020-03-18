from mongoengine import *
from mongoConfig import *
from os.path import exists
from shutil import rmtree
import json
import sys

def dumpTable(x):
  if (x == "User"):
    json_data = User.objects.to_json()
  if (x == "Crawler"):
    json_data = Crawler.objects.to_json()
  if (x == "InvertedIndex"):
    json_data = InvertedIndex.objects.to_json()

  json_object = json.loads(json_data)

  for entry in json_object:
    if(x == "Crawler"):
      entry['body'] = entry['body'][0 : 30]
    print("\n"+json.dumps(entry, indent=2))

if __name__ == "__main__":
  if(len(sys.argv) < 2):
    print("Usage: python3 databaseTest.py <table_name: Crawler, User, or InvertedIndex>\n")
    exit()
  if((str(sys.argv[1]) != "Crawler") & (str(sys.argv[1]) != "User") & (str(sys.argv[1]) != "InvertedIndex")):
    print("Usage: python3 databaseTest.py <table_name: Crawler, User, or InvertedIndex>\n")
    exit()
  else:
    connect(databaseName, host=databaseAddr, port=27017)
    dumpTable(str(sys.argv[1]))
