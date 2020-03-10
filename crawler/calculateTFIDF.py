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
    terms = InvertedIndex.objects()

    for termEntry in terms: 
        term = termEntry['term']
        idf = termEntry['idf']

        log("tfidf", 'Calculating '+term)

        for i in range(0, len(termEntry["doc_info"])):
            tf = termEntry['doc_info'][i]['termCount']
            log_tf = 0
            if (tf != 0):
                log_tf = math.log(tf, 2) + 1
            tf_idf = log_tf * idf
            docNum = int(termEntry['doc_info'][i]['docId'])
            termEntry['tfidf'][str(docNum)] = tf_idf
            
        termEntry.save()
        
    log("tfidf", 'Execution finished in '+str(time.time()-startTime)+' seconds.')

if __name__ == "__main__":
  calculateTFIDF()
    

