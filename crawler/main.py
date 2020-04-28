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
buildIndex(2, threads=4, passwordLock=False, reset=False, resetFiles=False, options=options, dev=True)
