from buildIndex import buildIndex

options = {
  'crawl':False,
  'pageRank': False,
  'parse':False,
  'database':True,
  'idf':False,
  'tfidf':False
}
# buildIndex(3, passwordLock=False)
buildIndex(2, passwordLock=False, reset=True, resetFiles=False, options=options, dev=True)
