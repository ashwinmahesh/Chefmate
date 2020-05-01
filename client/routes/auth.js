const passport = require("passport");
const sendPacket = require('../sendPacket');

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/plus.login'

      ]
    })
  );



  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/login");
  })


  app.get('/checkAuthenticated', (req, res) => {
    if(checkAuthentication(req)) return res.json(sendPacket(1, 'User is authenticated'));
    else return res.json(sendPacket(0, 'User not authenticated'));
  })
};

function checkAuthentication(request) {
  return request.isAuthenticated() && request.user; // == some stored value
}
