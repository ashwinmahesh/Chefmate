from fileIO import FileIO
import json
import uuid
import os

class Parser:
  def __init__(self, siteName):
    self.siteName = siteName
    self.crawledFile = 'domains/' + siteName + '/' + siteName + '_crawled.txt'
    self.indexFile = FileIO.createSiteIndexFile(self.siteName)
    self.links = set()

  def parse(self, link):
    return {'title':'test_title', 'body':'test_body'}

  def runParser(self):
    if not os.path.isfile(self.crawledFile):
        print("Error: no crawled file\n")
        return ''
    self.links = FileIO.fileToSet(self.crawledFile)
    if not self.links:
        print("Error: crawled file is empty\n")
        return ''
    data = FileIO.readJsonFile(self.indexFile)
    for link in self.links:
        if link not in data:
            obj = self.parse(link)
            data[link] = {
                'docId': str(uuid.uuid1()),
                'link': link,
                'title': obj['title'],
                'body': obj['body']
            }
    FileIO.deleteFileContents(self.indexFile)
    FileIO.writeJsonFile(data, self.indexFile)


if __name__ == "__main__":
  parser = Parser('EpiCurious')
  parser.runParser()