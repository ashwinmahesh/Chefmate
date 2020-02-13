from urllib.parse import urlparse

def getDomainName(url):
  try:
    results = getSubdomainName(url).split('.')
    return results[-2]+'.'+results[-1]
  except:
    return ''

def getSubdomainName(url):
  try:
    return urlparse(url).netloc
  except:
    return ''

if __name__ == "__main__":
  print(getDomainName('https://www.mail.google.com'))