import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer 

def stemQuery(query, stopwords):
  output=[]
  porterStemmer = PorterStemmer()
  tokenedText = word_tokenize(query)
  for word in tokenedText:
    if word not in stopwords:
      output.append(porterStemmer.stem(word))
  return output