def addSpecialChars(queryTerms):
    newTerms = list()

    for term in queryTerms:
        newTerms.append('(' + term)
        newTerms.append(term + ')')
        newTerms.append(term + ',')
        newTerms.append(term + '.')

    return queryTerms.extend(newTerms)