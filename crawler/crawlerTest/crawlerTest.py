import os
from bs4 import BeautifulSoup
import requests

def createSiteFileSetup(siteName, siteURL):
  if not os.path.exists(siteName):
    print("Creating site directory "+siteName)
    os.mkdir(siteName)
  queueFile = siteName + '_queue.txt'
  crawledFile = siteName + '_crawled.txt'
  if not os.path.isfile(queueFile):
    writeToFile(siteName+'/'+queueFile, siteURL)
  if not os.path.isfile(crawledFile):
    writeToFile(siteName+'/'+crawledFile, '')

def writeToFile(filePath, data):
  file = open(filePath, 'a')
  if data == '':
    file.write(data)
  else:
    file.write(data+'\n')
  file.close()

def deleteFileContents(filePath):
  with open(filePath, 'w'):
    pass

def fileToSet(filePath):
  output = set()
  with open(filePath, 'rt') as file:
    for line in file:
      output.add(line[:len(line)-1])
  print(output)
  return output

def setToFile(links, filePath):
  deleteFileContents(filePath)
  for link in sorted(links):
    writeToFile(filePath, link)

def findLinks(startingLink):
  page = requests.get(startingLink)
  soup = BeautifulSoup(page.content, 'html.parser')
  for link in soup.find_all('a'):
    print(link.get('href'))

if __name__ == "__main__":
  createSiteFileSetup('google', 'www.google.com')
  fileToSet('google/google_queue.txt')
  # page = requests.get('https://www.google.com')
  # soup = BeautifulSoup(page.content, 'html.parser')
  findLinks('https://www.google.com')
