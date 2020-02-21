class DatabaseBuilder:
  def __init__(self, domain):
    self.domain = domain
  
  def readFile(self):
    filePath = 'domains/'+domain +'/'+domain+"_index.txt" 
    file = open(filePath, 'r')
    for line in file:
      if line == "\n":
        continue
      docID = line
      link = file.readline()
      title = file.readline()
      body = file.readline()
      # newline = file.readline()

      print(f"{docID}\n{link}\n{title}\n{body}\n")

if __name__ == "__main__":
  d = DatabaseBuilder('SimplyRecipes')
  d.readFile()
        
