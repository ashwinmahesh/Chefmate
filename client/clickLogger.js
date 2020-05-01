var numOfClicksBuffEntries = 0;
var numOfSearchTimeBuffEntries = 0;
const clicksBuffSize = 1;
const searchTimeBuffSize = 1;
var clicksBuffer = new Array(clicksBuffSize);
var searchTimeBuffer = new Array(searchTimeBuffSize);

const fs = require('fs')

function setCurrQueryTime(time) {
  var datetime = new Date();
  let dd = datetime.getDate();

  let mm = datetime.getMonth()+1; 
  const yyyy = datetime.getFullYear();

  let hr = datetime.getHours();
  let min = datetime.getMinutes();
  let sec = datetime.getSeconds();

  if(dd<10) dd =`0${dd}`;
  if(mm<10) mm =`0${mm}`;
  if(hr<10) hr = `0${hr}`;
  if(min<10) min = `0${min}`;
  if(sec<10) sec = `0${sec}`;
  
  datetime = `${yyyy}/${mm}/${dd} ${hr}:${min}:${sec}`;

  const currQueryTime = time.toString();

  datetime = datetime.concat(" - ", currQueryTime, "\n");
  if (numOfSearchTimeBuffEntries < searchTimeBuffSize) {
    searchTimeBuffer.push(datetime);
    numOfSearchTimeBuffEntries++;
  } else {
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

function recordClick(redirect, currQuery) {
    var datetime = (new Date()).toString();
    datetime = datetime.concat("- \"", currQuery.toString(), "\" - ", redirect.toString(), "\n");
    if (numOfClicksBuffEntries < clicksBuffSize) {
      clicksBuffer.push(datetime);
      numOfClicksBuffEntries++;
    } else {
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

module.exports = {setCurrQueryTime, recordClick};
