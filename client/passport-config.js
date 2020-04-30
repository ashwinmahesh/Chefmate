const { User } = require('./mongoConfig');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./keys');
const log = require('./logger');

const bcrypt = require('bcrypt');

module.exports = (passport) => {
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
            log('login', 'Found existing user');
            done(null, existingUser);
          } else {
            log('login', 'No user exists');
            new User({
              userid: profile.emails[0].value,
              likes: {},
              dislikes: {},
              history: [],
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );

  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ userid: username }, async (err, user) => {
        if (err) return done(null, false, { message: 'No user found' });
        else if (!(password in user))
          return done(null, false, {
            message: 'User not registered with internal service',
          });

        try {
          if (await bcrypt.compare(password, user.password))
            return done(null, user, { message: 'Successfully logged in.' });
          else return done(null, false, { message: 'Password incorrect' });
        } catch (err) {
          return done(err);
        }
      });
    })
  );
};
