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

// var mongoUri = 'mongodb://localhost/chefmateDB'
var mongoUri = "mongodb://18.222.251.5/chefmateDB";
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(err => {
    console.log("Error: Not connected to database.");
  });

const CrawlerSchema = new mongoose.Schema(
  {
    url: { type: String, required: [true, "URL is required "] },
    title: { type: String, required: [true, "Web Page title is required"] },
    body: { type: String, required: [true, "Body of web page is required"] },
    hub: { type: Number, required: [true, "Hub is required"], default: 1 },
    authority: {
      type: Number,
      required: [true, "Authority is required"],
      default: 1
    }
  },
  { timestamps: true }
);
mongoose.model("Crawler", CrawlerSchema);
const Crawler = mongoose.model("Crawler");

const UserSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: [true, "Identifier is required for user"]
    },
    likes: {
      type: {},
      required: [true, "Likes are required. Resort to default {}"],
      default: {}
    },
    dislikes: {
      type: {},
      required: [true, "Dislikes are required. Resort to default {}"],
      default: {}
    },
    history: {
      type: { webpageID: String },
      required: [true, "History required. Resort to default {}"],
      default: {}
    }
  },
  { timestamps: true }
);
mongoose.model("User", UserSchema);
const User = mongoose.model("User");

const InvertedIndexSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: [true, "Term is required for InvertedIndex table"]
    },
    doc_info: {
      type: [{ doc_id: String, termCount: Number, pos: [Number] }],
      required: [
        true,
        "Doc Info is required, resort to default [] if needed. {}"
      ],
      default: []
    },
    idf: {
      type: Number,
      default: 1,
      required: [true, "IDF is required, resort to default (1) if needed."]
    },
    tfidf: {
      type: {},
      default: {},
      required: [true, "TFIDF is required, resort to default {} if needed."]
    }
  },
  { timestamps: true }
);
mongoose.model("InvertedIndex", InvertedIndexSchema);
const InvertedIndex = mongoose.model("InvertedIndex");

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
