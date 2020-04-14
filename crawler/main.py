from buildIndex import buildIndex

options = {
  'crawl':True,
  'pageRank': False,
  'parse':True,
  'database':False,
  'idf':False,
  'tfidf':False
}
# buildIndex(3, passwordLock=False)
buildIndex(2, passwordLock=False, reset=True, resetFiles=True, options=options, dev=False)
