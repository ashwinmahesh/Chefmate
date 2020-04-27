#!/usr/bin/python

import sys

def main(argv):
    print "\n"
    if str(argv[0]) == '1':
        file1 = open('./client/logs/searchTime.txt', 'r') 
        Lines = file1.readlines() 
  
        count = 0
        total = 0
        # Strips the newline character 
        for line in Lines: 
            total = total + float(line.strip().split(" - ")[1])
            count = count + 1
        print 'avg search time (s): ', (total/float(count))/1000
        print "\n"

if __name__ == "__main__":
   main(sys.argv[1:])