import os

class FileIO:
  @staticmethod
  def createSiteFileSetup(siteName, siteURL):
    domainsSiteName = 'domains/'+siteName
    if not os.path.exists('domains'):
      os.mkdir('domains')
    if not os.path.exists(domainsSiteName):
      print("Creating site directory " + siteName)
      os.mkdir('domains/'+siteName)
    queueFile = siteName + '_queue.txt'
    crawledFile = siteName + '_crawled.txt'
    if not os.path.isfile(queueFile):
      FileIO.writeToFile(domainsSiteName + '/' + queueFile, siteURL)
    if not os.path.isfile(crawledFile):
      FileIO.writeToFile(domainsSiteName + '/' + crawledFile, '')

  @staticmethod
  def writeToFile(filePath, data):
    file = open(filePath, 'a')
    if data == '':
      file.write(data)
    else:
      file.write(data + '\n')
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
        output.add(line[:len(line) - 1])
    return output

  @staticmethod
  def setToFile(links, filePath):
    for link in sorted(links):
      FileIO.writeToFile(filePath, link)


if __name__ == "__main__":
  FileIO.createSiteFileSetup('google', 'https://www.google.com')
  FileIO.fileToSet('google/google_queue.txt')
