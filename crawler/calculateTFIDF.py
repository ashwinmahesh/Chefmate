from mongoengine import *
from mongoConfig import *
import math
connect('chefmateDB', host='18.222.251.5', port=27017)

def calculateTFIDF(): 
    sparse_matrix = []
    terms = InvertedIndex.objects()

    for termEntry in terms: 
        term = termEntry['term']
        idf = termEntry['idf']
        docIDS = [0] * (len(Crawler.objects())) #count of docuemnts, line needs to be changed as of 8:46 PM
        for i in range(0, len(termEntry["doc_info"])):
            tf = termEntry['doc_info'][i]['termCount']
            log_tf = 0
            if (tf != 0):
                log_tf = math.log(tf, 2) + 1

            tf_idf = log_tf * idf
            docNum = int(termEntry['doc_info'][i]['docId'])
            docIDS[docNum] = tf_idf
            termEntry['tfidf'] = dict(key=docNum, tf_idf=tf_idf)
            termEntry.save()
        
        sparse_matrix.append(dict(term=term, tfIDF=docIDS))

    return sparse_matrix

if __name__ == "__main__":
  #Crawler.drop_collection()
  calculateTFIDF()
    

