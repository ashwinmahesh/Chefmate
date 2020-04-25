from queryExpansion import queryExpansion
from mongoConfig import *
import sys
sys.path.append('..')
sys.path.append('../crawler')
import rankerDBConfig
import json

from nltk.stem import PorterStemmer 

def fetchDocuments(stemmedQueryTerms, invertedIndex):
  expandedList = []
  for term in stemmedQueryTerms:
    expandedList.append(term)

  for queryTerm in stemmedQueryTerms:
     expandedList += [term for chiSquare, term in queryExpansion(queryTerm, invertedIndex)]
  
  termDBObjects = []
  for term in expandedList:
    try:
      termEntry = InvertedIndex.objects.get(term=term)
      termDBObjects.append(termEntry)
    except DoesNotExist:
      log("query", 'Term not found - '+term)
  return termDBObjects

if __name__ == '__main__':
  connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)
  porterStemmer = PorterStemmer()

  stemmed = []
  stemmed.append(porterStemmer.stem('butter'))
  stemmed.append(porterStemmer.stem('chicken'))
  stemmed.append(porterStemmer.stem('nuggets'))

  invertedIndex = json.loads(InvertedIndex.objects.to_json())

  print(fetchDocuments(stemmed, invertedIndex))

