if(process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const path = require('path')
const pino = require('express-pino-logger')();
const fs = require('fs')

const app = express();

const port = process.env.PORT || 8000;
const root = require('path').join(__dirname, 'frontend', 'build');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret: 'DontTellNobody69',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1*24*60*60*1000
  }
}));
app.use(pino)
app.use(express.static(root))

app.get('*', (request, response) => {
  return response.sendFile('index.html', { root });
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
})