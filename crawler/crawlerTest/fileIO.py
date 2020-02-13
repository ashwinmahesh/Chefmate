import os
# from bs4 import BeautifulSoup
# import requests

class FileIO:
  @staticmethod
  def createSiteFileSetup(siteName, siteURL):
    if not os.path.exists(siteName):
      print("Creating site directory "+siteName)
      os.mkdir(siteName)
    queueFile = siteName + '_queue.txt'
    crawledFile = siteName + '_crawled.txt'
    if not os.path.isfile(queueFile):
      FileIO.writeToFile(siteName+'/'+queueFile, siteURL)
    if not os.path.isfile(crawledFile):
      FileIO.writeToFile(siteName+'/'+crawledFile, '')

  @staticmethod
  def writeToFile(filePath, data):
    file = open(filePath, 'a')
    if data == '':
      file.write(data)
    else:
      file.write(data+'\n')
    file.close()

  @staticmethod
  def deleteFileContents(filePath):
    with open(filePath, 'w'):
      pass

  @staticmethod
  def fileToSet(filePath):
    output = set()
    with open(filePath, 'rt') as file:
      for line in file:
        output.add(line[:len(line)-1])
    return output
  
  @staticmethod
  def setToFile(links, filePath):
    # FileIO.deleteFileContents(filePath)
    for link in sorted(links):
      FileIO.writeToFile(filePath, link)

if __name__ == "__main__":
  FileIO.createSiteFileSetup('google', 'https://www.google.com')
  FileIO.fileToSet('google/google_queue.txt')
  # page = requests.get('https://www.google.com')
  # soup = BeautifulSoup(page.content, 'html.parser')
  # findLinks('https://www.google.com')
