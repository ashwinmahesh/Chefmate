const { User } = require('./mongoConfig');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

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
      User.findOne({ userid: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          console.log('No user exists');
          // new User({
          //   //googleId: profile.id,
          //   name: profile.displayName,
          //   email: profile.emails[0].value,
          //   photo: profile.photos[0].value.split('?')[0],
          // })
          //   .save()
          //   .then((user) => done(null, user));
        }
      });
    }
  )
);
