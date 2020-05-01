def convertWeightsToZeroAverage(userMatrix, modifyIndex):
  sumVal = 0.0
  count = 0.0
  avg = 0.0

  for i in range(0, len(userMatrix[modifyIndex])):
    if userMatrix[modifyIndex][i] != 0:
      sumVal += userMatrix[modifyIndex][i]
      count += 1.0

  if count > 0:
    avg = sumVal / count

  for i in range(0, len(userMatrix)):
    if userMatrix[modifyIndex][i] !=0:
      userMatrix[modifyIndex][i] = userMatrix[modifyIndex][i] - avg
  