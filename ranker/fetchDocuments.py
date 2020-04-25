from queryExpansion import queryExpansion
from mongoConfig import *
import sys
sys.path.append('..')
sys.path.append('../crawler')
import rankerDBConfig
import json

from nltk.stem import PorterStemmer 

def fetchDocuments(stemmedQueryTerms, allTerms):
  expandedList = []
  for term in stemmedQueryTerms:
    expandedList.append(term)

  for queryTerm in stemmedQueryTerms:
     expandedList += [term for chiSquare, term in queryExpansion(queryTerm, allTerms)]
  return expandedList

if __name__ == '__main__':
  connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)
  porterStemmer = PorterStemmer()

  stemmed = []
  stemmed.append(porterStemmer.stem('butter'))
  stemmed.append(porterStemmer.stem('chicken'))
  stemmed.append(porterStemmer.stem('nuggets'))

  allTerms = json.loads(InvertedIndex.objects.to_json())

  print(fetchDocuments(stemmed, allTerms))

