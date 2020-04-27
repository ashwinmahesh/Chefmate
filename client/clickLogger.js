var currQuery = "example";
var currQueryTime = 0;
var currNumDocs = 0;
var numOfClicksBuffEntries = 0;
var numOfSearchTimeBuffEntries = 0;
const clicksBuffSize = 5;
const searchTimeBuffSize = 1;
var clicksBuffer = new Array(clicksBuffSize);
var searchTimeBuffer = new Array(searchTimeBuffSize);


function setCurrQuery(query) {
    currQuery = query;
}

function setCurrNumDocs(num) {
  currNumDocs = num;
}

function setCurrQueryTime(time) {
  currQueryTime = time.toString();
  var datetime = (new Date()).toString();
  datetime = datetime.concat(" - ", currQueryTime, " - ", 5, "\n");
  console.log("debug", `Datetime: ${datetime}`);
  if (numOfSearchTimeBuffEntries < searchTimeBuffSize) {
    searchTimeBuffer.push(datetime);
    numOfSearchTimeBuffEntries++;
  } else {
    var fs = require('fs')
    var fw = fs.createWriteStream('./logs/searchTime.txt', {
        flags: 'a' // 'a' means appending
    });

    for (var i = 0; i < searchTimeBuffSize; i++) {
      var temp = searchTimeBuffer.pop();
      fw.write(temp);
    }
    fw.write(datetime);
    numOfSearchTimeBuffEntries = 0;
    fw.end();
  }
}



function recordClick(redirect) {
    var datetime = (new Date()).toString();
    datetime = datetime.concat("- \"", currQuery.toString(), "\" - ", redirect.toString(), "\n");
    if (numOfClicksBuffEntries < clicksBuffSize) {
      clicksBuffer.push(datetime);
      numOfEntries++;
    } else {
      var fs = require('fs')
      var fw = fs.createWriteStream('./logs/clicks.txt', {
          flags: 'a' // 'a' means appending
      });

      for (var i = 0; i < clicksBuffSize; i++) {
        var temp = clicksBuffer.pop();
        fw.write(temp);
      }
      fw.write(datetime);
      numOfClicksBuffEntries = 0;
      fw.end();
    }
}

module.exports = {setCurrQuery, setCurrNumDocs, setCurrQueryTime, recordClick};