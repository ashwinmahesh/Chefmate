if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const path = require("path");
const pino = require("express-pino-logger")();
const fs = require("fs");
const mongoose = require("mongoose");
const passport = require("passport");
const initializePassport = require("./passport-config");
const bcrypt = require("bcrypt");

const app = express();

initializePassport(passport);

const port = process.env.PORT || 8000;
const root = require("path").join(__dirname, "frontend", "build");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "DontTellNobody69",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000
    }
  })
);
app.use(pino);
app.use(express.static(root));

var mongoUri = "mongodb://localhost/chefmateDB";
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error: Not connected to database.");
  });

//Insert server response functions here

app.get("/testRoute", (request, response) => {
  return response.json(sendPacket(1, "Successfully got response"));
});

app.get("*", (request, response) => {
  return response.sendFile("index.html", { root });
});

//TODO
function checkAuthentication(request) {
  return request.isAuthenticated() && request.user.id; // == some stored value
}
function sendPacket(success, message, content = {}) {
  return { success: success, message: message, content: content };
}
//Insert helper functions here

app.listen(port, () => {
  console.log(`Client server is listening on port ${port}.`);
});
