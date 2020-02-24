from crawler import Crawler
from dataParser import DataParser
from databaseBuilder import DatabaseBuilder

domains = [
    {'name': 'Tasty', 'root': 'https://tasty.co/'},
    {'name': 'SimplyRecipes', 'root': 'https://www.simplyrecipes.com/'},
    {'name': 'EpiCurious', 'root': 'https://www.epicurious.com/'},
    {'name': 'GoodFood', 'root': 'https://www.bbcgoodfood.com/'}
]

def buildIndex(iterations):
  for domain in domains:
    crawler = Crawler(domain['name'], domain['root'])
    crawler.runSpider(iterations)
    dataParser = DataParser(domain['name'])
    dataParser.runParser()
    databaseBuilder = DatabaseBuilder(domain['name'])
    databaseBuilder.build()
  
  DatabaseBuilder.calculateIDF()

if __name__ == "__main__":
  buildIndex(2)
