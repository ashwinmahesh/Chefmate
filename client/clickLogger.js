var currQuery = "example";
var numOfEntries = 0;
const clicksBuffSize = 5;
var clicksBuffer = new Array(clicksBuffSize);


function setCurrQuery(query) {
    currQuery = query;
}

function recordClick(redirect) {
    // Logging clicks
    var datetime = (new Date()).toString();
    datetime = datetime.concat("\"", currQuery.toString(), "\" - ", redirect.toString(), "\n");
    console.log("debug", `datetime: ${datetime}`);
    if (numOfEntries < clicksBuffSize) {
      clicksBuffer.push(datetime);
      numOfEntries++;
    } else {
      var fs = require('fs')
      var fw = fs.createWriteStream('./logs/clicks.txt', {
          flags: 'a' // 'a' means appending
      });

      for (var i = 0; i < clicksBuffSize - 1; i++) {
        var temp = clicksBuffer.pop();
        fw.write(temp);
      }
      fw.write(datetime);
      numOfEntries = 0;
      fw.end();
      console.log("debug", 'wrote to clicks.txt')
    }
    console.log("debug", `Current numOfEntries ${numOfEntries}`)
}
module.exports = {setCurrQuery, recordClick};