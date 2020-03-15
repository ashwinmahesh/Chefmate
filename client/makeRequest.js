const axios = require('axios');
const log = require('./logger');

//TODO Update with deployed IPs
function getServerPath(serverName) {
  if(serverName == 'client')
    return 'http://localhost:8000'
  else if (serverName == 'crawler')
    return 'http://localhost:8001'
  else if(serverName == 'ranker')
    return 'http://localhost:8002'
  else return "ERROR"
}

function makeRequest(server, route, method='GET', data={}) {
  const serverPath = getServerPath(server);
  if(serverPath == 'ERROR') {
    log('error', 'Invalid server path');
    return { success: 0, message: 'Invalid server path.' };
  }
  if(method == 'GET') {
    return axios.get(`${serverPath}/${route}`)
      .then(res => {
        return res.data
      }).catch(error => {
        log('error', error);
        return { success: -1, message: 'Error connecting to server' }
      });
  } else if (method == 'POST') {
    return axios.post(`${serverPath}/${route}`, data)
      .then(res => {
        return res.data
      }).catch(error => {
        log('error', error);
        return { success: -1, message: 'Error connecting to server' }
      });
  }
  else {
    return { success: 0, message: 'Invalid http method.' }
  }
}

module.exports = makeRequest;