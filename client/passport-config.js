const { User } = require('./mongoConfig');
const bcrypt = require('bcrypt');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const log = require('./logger');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      proxy: true,
    },
    (_, _2, profile, done) => {
      User.findOne({ userid: profile.emails[0].value }).then((existingUser) => {
        if (existingUser) {
          log("login", "Found existing user")
          done(null, existingUser);
        } else {
          log("login", 'No user exists')
          new User({
            userid: profile.emails[0].value,
            likes: {},
            dislikes: {},
            history: []
          }).save().then((user) => done(null, user));
        }
      });
    }
  )
);


passport.use(
  new localStrategy(
    {
      username: 'username',
      password: 'password',
    },
    (username,Password, done) => {
      User.findOne({ userid: username }).then((existingUser) => {
        if (existingUser) {
          log("login", "Found existing user")
          try{
            //DONT KNOW HOW TO STOP AWAIT ERROR
            if(await bcrypt.compare(password,existingUser.passwordField)) {
              return done(null,existingUser)
            } else {
              return done(null, false, {message: 'Password incorrect'})
            }
          }catch(e){
            return done(e)
          }
        } else {
          log("login", 'No user exists')
        }
      });
    }
  )
);



