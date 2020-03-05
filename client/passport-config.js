const { User } = require('./mongoConfig');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const log = require('./logger');

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
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ userid: profile.emails[0].value }).then((existingUser) => {
        if (existingUser) {
          log("login", "Found existing user")
          done(null, existingUser);
        } else {
          log("login", 'No user exists')
          new User({
            userid: profile.emails[0].value
          }).save().then((user) => done(null, user));
        }
      });
    }
  )
);
