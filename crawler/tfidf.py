from mongoengine import *
from mongoConfig import *
import math
import json
from databaseBuilder import DatabaseBuilder

def tfidfScores(): 
    sparse_matrix = []
    terms = InvertedIndex.objects()
    # print(terms1)
    # print(terms1[0].to_json())
    # terms1 = InvertedIndex.objects.to_json()
    # terms = json.loads(terms1)
    # print("Hello")
    for termEntry in terms: 
        term = termEntry['term']
        idf = termEntry['idf']
        docIDS = [0] * (len(Crawler.objects())) #count of docuemnts, line needs to be changed as of 8:46 PM
        #print(termEntry["doc_info"])
        for i in range(0, len(termEntry["doc_info"])):
            tf = termEntry['doc_info'][i]['termCount']
            log_tf = 0
            if (tf != 0):
                log_tf = math.log(tf, 2) + 1

            tf_idf = log_tf * idf
            # print(termEntry['doc_info'][i])
            docNum = int(termEntry['doc_info'][i]['docId'])
            docIDS[docNum] = tf_idf
            termEntry['tfidf'] = dict(key=docNum, tf_idf)
        
        sparse_matrix.append(dict(term=term, tfIDF=docIDS))
    
    #print(sparse_matrix)
    
    return sparse_matrix

if __name__ == "__main__":
  #Crawler.drop_collection()
  tfidfScores()
    

