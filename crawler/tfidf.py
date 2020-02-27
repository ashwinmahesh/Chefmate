from mongoengine import *
from mongoConfig import *
import math
from databaseBuilder import DatabaseBuilder

def tfidfScores(): 
    sparse_matrix = []
    terms = InvertedIndex.objects()
    print("Hello")
    for termEntry in terms: 
        term = termEntry['term']
        idf = termEntry['idf']
        docIDS = [0] * DatabaseBuilder.docCount #count of docuemnts, line needs to be changed as of 8:46 PM
        for i in range(0, len(termEntry.doc_info)):
            tf = termEntry.doc_info[i]['termCount']
            log_tf = 0
            if (tf != 0):
                log_tf = math.log(tf, 2) + 1

            tf_idf = log_tf * idf
            docNum = int(termEntry.doc_info[i]['_id'])
            docIDS[docNum] = tf_idf
        
        sparse_matrix.append(dict(term=term, tfIDF=docIDS))
        print(sparse_matrix)
    
    return sparse_matrix

if __name__ == "__main__":
  tfidfScores()
    

