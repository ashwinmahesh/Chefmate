import array
import sys
from mongoConfig import *
import rankerDBConfig


connect(rankerDBConfig.databaseName, host=rankerDBConfig.databaseAddr, port=27017)

def getSimilarTerm(word):
    minDist = 1000
    match = "no-match"
    termsCollection = InvertedIndex.objects
    for entry in termsCollection:
        x = levenshtein(word, entry['term'])
        if (x < minDist):
            minDist = x
            match = entry['term']
    return match


# Code From: https://www.python-course.eu/levenshtein_distance.php
def memoize(func):
    mem = {}
    def memoizer(*args, **kwargs):
        key = str(args) + str(kwargs)
        if key not in mem:
            mem[key] = func(*args, **kwargs)
        return mem[key]
    return memoizer

# Code From: https://www.python-course.eu/levenshtein_distance.php
@memoize    
def levenshtein(s, t):
    if s == "":
        return len(t)
    if t == "":
        return len(s)
    if s[-1] == t[-1]:
        cost = 0
    else:
        cost = 1
    
    res = min([levenshtein(s[:-1], t)+1,
               levenshtein(s, t[:-1])+1, 
               levenshtein(s[:-1], t[:-1]) + cost])

    return res

if __name__ == "__main__":
   main(sys.argv[1:])