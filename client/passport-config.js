const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserInfo, getUserById) {
  const authenticateUser = async (username, password, done) => {
    const user = getUserInfo(username);
    if (user === false) return done(null, false, { message: "User not found"})

    try {
      if (await bcrypt.compare(password, user.password)) 
        return done(null, user, { message: "Successfully found user."});
      else 
        return done(null, false, { message: "Password incorrect."});
    } catch(err) {
        return done(err)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

module.exports = initialize;