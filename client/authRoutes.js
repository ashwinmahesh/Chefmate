const passport = require("passport");

module.exports = app => {
  app.get("/auth/test", (req, res) => {
    res.send("Auth Working properly");
  });
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
  //Maybe dont need this route (can change it)
  app.get(
    "/SearchResult",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/SearchResult");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
