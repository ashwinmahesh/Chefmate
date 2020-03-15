if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const path = require('path');
const pino = require('express-pino-logger')();
const fs = require('fs');
const passport = require('passport');
require('./passport-config');
const bcrypt = require('bcrypt');

// const { mongoose } = require('./mongoConfig');
const { mongoose, User, InvertedIndex, Crawler} = require('./mongoConfig');

const log = require('./logger');
const makeRequest = require('./makeRequest');

const app = express();

const port = process.env.PORT || 8000;
const root = require('path').join(__dirname, 'frontend', 'build');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: 'DontTellNobody69',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(pino);
app.use(express.static(root));
app.use(passport.initialize());
app.use(passport.session());
require('./authRoutes')(app);

//Insert server response functions here

app.get('/search/:query', async (request, response) => {
  const query = request.params['query'];
  log('query', query);
  const data = await makeRequest('ranker', `query/${query}`);
  log('ranker', data.message);
  return response.json(
    sendPacket(data.success, `Successfully received response from ranker: ${query}`, data.content)
  );
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect("/login");
})

app.get('/checkAuthenticated', (req, res) => {
  if(checkAuthentication(req)) return res.json(sendPacket(1, 'User is authenticated'));
  else return res.json(sendPacket(0, 'User not authenticated'));
})

app.post('/fetchDocuments', async (req, res) => {
  log('fetch', 'Fetching documents from ranker')
  const docIds = req.body['docIds']
  const data = await makeRequest('ranker', 'fetchDocuments', 'POST', {docIds: docIds})
  const documents = data['content']['documents']
  
  return res.json(sendPacket(1, 'Successfully fetched documents', {documents: documents}))
})

app.get('/testRoute', (request, response) => {
  return response.json(sendPacket(1, 'Successfully got response'));
});

app.get('*', (request, response) => {
  return response.sendFile('index.html', { root });
});

function checkAuthentication(request) {
  return request.isAuthenticated() && request.user; // == some stored value
}

function sendPacket(success, message, content = {}) {
  return { success: success, message: message, content: content };
}
//Insert helper functions here

app.listen(port, () => {
  log('info', `Client server is listening on port ${port}.`);
});
