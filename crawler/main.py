from buildIndex import buildIndex

#crawl true, parse true, everything else false, pass into buildIndex, will then only run those things and not mess w database. reset:false to stop from updating everytime.
#dev:true only for database building. returns after 5 docs to rapidly test. keep pageRank:false for latest version of master. 

options = {
  'crawl':True,
  'pageRank': False,
  'parse':True,
  'database':False,
  'idf':False,
  'tfidf':False
}
# buildIndex(3, passwordLock=False)
buildIndex(2, passwordLock=False, reset=True, resetFiles=False, options=options, dev=True)
