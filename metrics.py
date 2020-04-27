#!/usr/bin/python

import sys
import datetime

def main(argv):
    print "\n"
    if str(argv[0]) == '1':
        usingDateRange = 0
        if (len(argv) == 3):
            usingDateRange = 1
            startDateObj = datetime.datetime.strptime(argv[1].strip().split(":")[0], '%Y/%m/%d')
            startTimeInt = (int(argv[1].strip().split(":")[1]) * 60 * 60) + (int(argv[1].strip().split(":")[2]) * 60) + (int(argv[1].strip().split(":")[3]))
            endDateObj = datetime.datetime.strptime(argv[2].strip().split(":")[0], '%Y/%m/%d')
            endTimeInt = (int(argv[2].strip().split(":")[1]) * 60 * 60) + (int(argv[2].strip().split(":")[2]) * 60) + (int(argv[2].strip().split(":")[3]))

        file1 = open('./client/logs/searchTime.txt', 'r') 
        Lines = file1.readlines() 
  
        count = 0
        total = 0
        for line in Lines:
            dateStr = line.strip().split(" - ")[0]
            timeStr = dateStr.strip().split(" ")[1]
            currDateObj = datetime.datetime.strptime(dateStr.strip().split(" ")[0], '%Y/%m/%d')
            currTimeInt = (int(timeStr.strip().split(":")[0]) * 60 * 60) + (int(timeStr.strip().split(":")[1]) * 60) + (int(timeStr.strip().split(":")[2]))
            if (usingDateRange == 1):
                if ((currDateObj < startDateObj) | (currDateObj > endDateObj)):
                    continue
                if (currDateObj == startDateObj):
                    if (currTimeInt < startTimeInt):
                        continue
                if (currDateObj == endDateObj):
                    if (currTimeInt > endTimeInt):
                        continue
            total = total + float(line.strip().split(" - ")[1])
            count = count + 1
        if (count == 0):
            print "No data available in the described date/time range"
        else :
            print 'avg search time (s): ', (total/float(count))/1000
            print 'over ', count, ' datapoints'
        
        print "\n"

if __name__ == "__main__":
   main(sys.argv[1:])