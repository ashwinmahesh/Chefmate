from buildIndex import buildIndex

options = {
  'crawl':True,
  'pageRank': True,
  'parse':True,
  'database':False,
  'idf':False,
  'tfidf':False
}
# buildIndex(3, passwordLock=False)
buildIndex(2, reset=True, resetFiles=True, options=options, dev=True)
