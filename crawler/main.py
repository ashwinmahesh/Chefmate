from buildIndex import buildIndex

options = {
  'crawl':False,
  'pageRank': False,
  'parse':True,
  'database':True,
  'idf':False,
  'tfidf':False
}
# buildIndex(3, passwordLock=False)
buildIndex(2, threads=4, passwordLock=False, reset=True, resetFiles=False, options=options, dev=True)
