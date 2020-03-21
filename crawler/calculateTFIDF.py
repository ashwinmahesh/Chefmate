from mongoengine import *
from mongoConfig import *
import math
import time
import sys
sys.path.append('..')
from helpers import log

def calculateTFIDF(): 
    startTime = time.time()
    connect(databaseName, host=databaseAddr, port=27017)
    terms = InvertedIndex.objects()
    log('tfidf', 'Calculating TFIDF scores for all terms and documents')
    for termEntry in terms: 
        term = termEntry['term']
        idf = termEntry['idf']
        # log("tfidf", 'Calculating '+term)

        for docKey in termEntry["doc_info"]:
            tf = termEntry['doc_info'][docKey]['termCount']
            log_tf = 0
            if (tf != 0):
                log_tf = math.log(tf, 2) + 1
            tf_idf = log_tf * idf
            termEntry['doc_info'][docKey]['tfidf']=tf_idf
        
        termEntry.save()
        
    log("time", 'Execution finished in '+str(time.time()-startTime)+' seconds.')

if __name__ == "__main__":
  calculateTFIDF()
    

