import sys
sys.path.append('..')
sys.path.append('../crawler')
from mongoengine import *
from mongoConfig import *
from helpers import log

def calculateCosineSimilarity(terms):
  connect('chefmateDB', host='18.222.251.5', port=27017)
  docIds = set()
  for term in terms:
    entry = InvertedIndex.objects.get(term=term)
    doc_info_list = entry['doc_info']
    for doc in doc_info_list:
      print(doc)
  


if __name__ =="__main__":
  # calculateCosineSimilarity(['meal', 'bake'])
    calculateCosineSimilarity(['recip'])