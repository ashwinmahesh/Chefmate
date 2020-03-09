from mongoengine import *
from mongoConfig import *
import math
import time
import sys
sys.path.append('..')
from helpers import log

def calculateTFIDF(): 
    startTime = time.time()
    connect('chefmateDB', host='18.222.251.5', port=27017)
    sparse_matrix = []
    terms = InvertedIndex.objects()

    for termEntry in terms: 
        term = termEntry['term']
        idf = termEntry['idf']
        docIDS = [0] * (len(Crawler.objects()))

        print("Number docs:"+str(len(Crawler.objects())))

        log("tfidf", 'Calculating '+term)

        for i in range(0, len(termEntry["doc_info"])):
            tf = termEntry['doc_info'][i]['termCount']
        
            log_tf = 0
            if (tf != 0):
                log_tf = math.log(tf, 2) + 1

            tf_idf = log_tf * idf
            docNum = int(termEntry['doc_info'][i]['docId'])
            print("DocNum:"+str(docNum))
            docIDS[docNum] = tf_idf
            termEntry['tfidf'] = dict(key=docNum, tf_idf=tf_idf)
            termEntry.save()
        
        sparse_matrix.append(dict(term=term, tfIDF=docIDS))
        
    log("tfidf", 'Execution finished in '+str(time.time()-startTime)+' seconds.')
    return sparse_matrix

if __name__ == "__main__":
  calculateTFIDF()
    

