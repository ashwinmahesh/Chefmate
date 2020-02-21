from crawler import Crawler

domains = [
    {'name': 'Tasty', 'root': 'https://tasty.co/'},
    {'name': 'FoodGawker', 'root': 'https://foodgawker.com/'},
    {'name': 'SimplyRecipes', 'root': 'https://www.simplyrecipes.com/'},
    {'name': 'EpiCurious', 'root': 'https://www.epicurious.com/'},
    {'name': 'GoodFood', 'root': 'https://www.bbcgoodfood.com/'}
]

def buildIndex():
  for domain in domains:
    crawler = Crawler(domain.name, domain.root)
    crawler.runSpider(5)

if __name__ == "__main__":
  buildIndex()
