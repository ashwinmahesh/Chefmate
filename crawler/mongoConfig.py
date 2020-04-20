import datetime
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
  history = ListField(StringField(required=True, default={}))
  created_at = DateTimeField(default=datetime.datetime.now())
  updated_at = DateTimeField(default=datetime.datetime.now())

class Query(Document):
  query = StringField(required=True, primary_key=True)
  count = IntField(required=True, default=1)

databaseName = 'ChefmateDB'
# databaseName = 'ChefmateDB_Alt'

# databaseAddr = '18.219.145.177' #NEW DB
databaseAddr = '18.222.251.5'
# databaseAddr = 'localhost'

