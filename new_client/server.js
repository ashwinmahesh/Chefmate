// if (process.env.NODE_ENV != 'production') {
//   require('dotenv').config();
// }

const express = require("express");
const expressSession = require('express-session');
const pino = require('express-pino-logger')();
const mongoose = require("mongoose");
const passport = require("passport");
// const initializePassport = require('./passport-config');
const database = require('./mongoConfig');
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const path = require('path')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const auth = require("./routes/api/auth");
const posts = require("./routes/api/posts");

const mongo = database.mongoose;
const User = database.User;
const InvertedIndex = database.InvertedIndex;
const Crawler = database.Crawler;

// initializePassport(passport);

const port = process.env.PORT || 4500;
const root = require('path').join(__dirname, 'client', 'build');

require("./models/User.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge:  1 * 24 * 60 * 60 * 1000,
    keys: ["somesecretsauce"]
  })
);

app.use(pino);
app.use(express.static(root));

// MongoDB configuration
const db = require("./config/keys").mongoURI;

// Use mongoose to connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require("./config/passport");

//Use routes from routes folder
//app.use("/api/auth", auth);
//app.use("/api/posts", posts);

require("./routes/api/auth.js")(app);
require("./routes/api/posts.js")(app);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Insert server response functions here

app.get('/search/:query', async (request, response) => {
  const query = request.params['query'];
  log('query', query);
  const data = await makeRequest('ranker', `query/${query}`);
  log('ranker', data.message);
  return response.json(
    sendPacket(data.success, `Successfully received response from ranker: ${query}`)
  );
});

app.get('/testRoute', (request, response) => {
  return response.json(sendPacket(1, 'Successfully got response'));
});

app.get('*', (request, response) => {
  return response.sendFile('index.html', { root });
});

//TODO
function checkAuthentication(request) {
  return request.isAuthenticated() && request.user.id; // == some stored value
}
function sendPacket(success, message, content = {}) {
  return { success: success, message: message, content: content };
}

// const port = process.env.PORT || 4500;

app.listen(port, () => console.log(`App running on port ${port}`));
