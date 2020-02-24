import datetime
from mongoengine import *

class Crawler(Document):
  url = StringField(required=True, primary_key=True)
  docId = StringField(required=True)
  # _id = StringField(required=True)
  title = StringField(required=True)
  body = ListField(StringField(required=True))
  hub = LongField(required=True, default=1.0)
  authority = LongField(required=True, default=1.0)
  created_at = DateTimeField(default=datetime.datetime.now())
  updated_at = DateTimeField(default=datetime.datetime.now())

class InvertedIndex(Document):
  term = StringField(required=True, primary_key=True)
  doc_info = ListField(DictField(required=True), default=[])
  idf = LongField(required=True, default=1)
  tfidf = DictField(required=True, default={})
  created_at = DateTimeField(default=datetime.datetime.now())
  updated_at = DateTimeField(default=datetime.datetime.now())

class User(Document):
  userid = StringField(required=True, primary_key=True)
  password = StringField(required=True)
  likes = DictField(required=True, default={})
  dislikes = DictField(required=True, default={})
  history = DictField(required=True, default={})
  created_at = DateTimeField(default=datetime.datetime.now())
  updated_at = DateTimeField(default=datetime.datetime.now())
