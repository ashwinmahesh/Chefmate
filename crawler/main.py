from buildIndex import buildIndex

options = {
  'crawl':False,
  'pageRank': True,
  'parse':True,
  'database':True,
  'idf':True,
  'tfidf':True
}
# buildIndex(3, passwordLock=False)
buildIndex(2, threads=4, passwordLock=False, reset=True, resetFiles=False, options=options, dev=True)
