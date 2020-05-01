from buildIndex import buildIndex

options = {
  'crawl':True,
  'pageRank': False,
  'parse':True,
  'database':True,
  'idf':True,
  'tfidf':True
}
# buildIndex(3, passwordLock=False)
buildIndex(2, threads=4, passwordLock=False, reset=False, resetFiles=False, options=options, dev=True)
