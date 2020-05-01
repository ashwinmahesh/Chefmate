from queryExpansion import performQueryExpansion
from levenDistance import getSimilarTerm
from mongoConfig import *
import sys
sys.path.append('..')
sys.path.append('../crawler')
import rankerDBConfig
import json
from helpers import log

from nltk.stem import PorterStemmer 

def fetchDocuments(stemmedQueryTerms, invertedIndex, queryExpansion=False):
  expandedList = []
  for term in stemmedQueryTerms:
    expandedList.append(term)

  if queryExpansion:
    for queryTerm in stemmedQueryTerms:
      expandedList += [term for chiSquare, term in performQueryExpansion(queryTerm, invertedIndex)]
  
  termDBObjects = []
  didUMean = {}
  for term in expandedList:
    try:
      termEntry = InvertedIndex.objects.get(term=term)
      termDBObjects.append(termEntry)
    except DoesNotExist:
      log("query", 'Term not found - '+term+' ...Attempting to find similar...')
      didUMean[term] = getSimilarTerm(term)

  return termDBObjects, didUMean

if __name__ == '__main__':
  connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)
  porterStemmer = PorterStemmer()

  stemmed = []
  stemmed.append(porterStemmer.stem('butter'))
  stemmed.append(porterStemmer.stem('chicken'))
  stemmed.append(porterStemmer.stem('nuggets'))

  invertedIndex = json.loads(InvertedIndex.objects.to_json())

  print(fetchDocuments(stemmed, invertedIndex))

