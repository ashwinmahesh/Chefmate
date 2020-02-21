class DatabaseBuilder:
  def __init__(self, domain):
    self.domain = domain
  
  def readFile(self):
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

      print(f"{docID}\n{link}\n{title}\n{body}\n")

if __name__ == "__main__":
  d = DatabaseBuilder('SimplyRecipes')
  d.readFile()
        
