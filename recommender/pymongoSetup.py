import sys
sys.path.append('../crawler')
sys.path.append('../ranker')
import rankerDBConfig
from mongoConfig import *

from pymongo import MongoClient

client = MongoClient(rankerDBConfig.databaseAddr, 27017)
db = client['ChefmateDB']


##This doesn't work, delete the file.
User = db['user']
Crawler = db['crawler']
for user in User.find({}):
  print(user)