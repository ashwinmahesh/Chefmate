if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const express = require('express');
const pino = require('express-pino-logger')();

const bodyParser = require('body-parser');
const expressSession = require('express-session');
const passport = require('passport');
require('./passport-config')(passport);

const app = express();

const port = process.env.PORT || 8000;
const root = require('path').join(__dirname, 'frontend', 'build');

const log = require('./logger');

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

require('./routes/auth')(app);
require('./routes/user')(app);
require('./routes/search')(app);
require('./routes/external')(app)

app.get('*', (_, response) => {
  return response.sendFile('index.html', { root });
});

app.listen(port, () => {
  log('info', `Client server is listening on port ${port}.`);
});
