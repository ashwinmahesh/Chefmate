import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer 

def stemQuery(query):
  output=[]
  porterStemmer = PorterStemmer()
  tokenedText = word_tokenize(query)
  for word in tokenedText:
    output.append(porterStemmer.stem(word))
  return output