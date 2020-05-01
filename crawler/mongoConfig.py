import datetime
import os
from mongoengine import *

class Crawler(Document):
  url = StringField(required=True, primary_key=True)
  title = StringField(required=True)
  description = StringField(required=True)
  body = StringField(required=True)
  hub = FloatField(required=True, default=1.0)
  authority = FloatField(required=True, default=1.0)
  pageRank = FloatField(required=True, default=1.0)
  created_at = DateTimeField(default=datetime.datetime.now())
  updated_at = DateTimeField(default=datetime.datetime.now())
  tfidf = DictField(required=True, default={})

class InvertedIndex(Document):
  term = StringField(required=True, primary_key=True)
  doc_info = DictField(required=True, default={})
  idf = FloatField(required=True, default=1)
  created_at = DateTimeField(default=datetime.datetime.now())
  updated_at = DateTimeField(default=datetime.datetime.now())

class User(Document):
  userid = StringField(required=True, primary_key=True)
  password = StringField(required=False)
  likes = DictField(required=True, default={})
  dislikes = DictField(required=True, default={})
  history = ListField(StringField(required=True, default=[]))
  recent_queries = ListField(StringField(required=True, default=[]))
  created_at = DateTimeField(default=datetime.datetime.now())
  updated_at = DateTimeField(default=datetime.datetime.now())

class Query(Document):
  query = StringField(required=True, primary_key=True)
  count = IntField(required=True, default=1)

username = 'admin'
password = ''

try:
  password = open("../../Chefmate_auth/pw.txt").read()
  print(password)
except:
  print("Error getting Mongo password. Make sure Chefmate_auth/pw.txt exists and is populated.")

#password = os.environ.get('MONGODB_PW') or ''

databaseName = 'ChefmateDB'
#databaseName = 'ChefmateDB_Alt'
host = '18.219.145.177' #NEW DB
#host = 'localhost'
#host = '18.222.251.5'
port = 27017

#Do *NOT* hardcode password, ever
databaseAddr = 'mongodb://' + username + ":" + password.rstrip() + "@" + host + ":" + str(port) + "/" + databaseName
print(databaseAddr)