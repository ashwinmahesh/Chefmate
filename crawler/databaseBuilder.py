import sys
sys.path.append('..')
import helpers
log = helpers.log
from fileIO import fileIO


#TODO Replace with actual DB write funtions in the future. Using these stubs for now.
def inDatabase(db, word):
  return False

#dbName can be Crawler, InvertedIndex, or User
def writeToDatabase(dbName, contents, key):
  _id = key
  print("Writing to database:", contents)

def updateDatabaseEntry(dbName, contents, key):
  _id = key
  print("Updating database entry")

class DatabaseBuilder:
  def __init__(self, domain):
    self.domain = domain
  
  def readFile(self, printStatements=False):
    filePath = 'domains/'+self.domain +'/'+self.domain+"_index.txt" 

    file = open(filePath, 'r')
    for line in file:
      if line == "\n":
        continue
      docID = line
      link = file.readline()
      title = file.readline()
      body = file.readline()

      docID = docID[7:len(docID)-1]
      link = link[6:len(link)-1]
      title = title[7:len(title)-1]
      body = body[6:len(body)-1]

      self.addDocumentToCollection(docID, link, title, body)
      if printStatements:
        log('entry', docID)
        log('entry', link)
        log('entry', title)
        log('entry', body)
  
  def addDocumentToCollection(self, docID, link, title, body):
    writeToDatabase('Crawler', {'link':link, 'title':title, 'body':body}, docID)
    
  def buildInvertedIndex(self, body, docID):
    wordPos = 0
    for word in body:
      wordPos += 1
      if not inDatabase('InvertedIndex', word):
        writeToDatabase('InvertedIndedx', {}, word)
      # Need to update this logic
      # updateDatabaseEntry('InvertedIndex', {'doc_id':docID, 'term_count':1, 'pos':[wordPos]}, word)
      

if __name__ == "__main__":
  d = DatabaseBuilder('SimplyRecipes')
  d.readFile(printStatements=True)
        
