const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/", { target: "http://localhost:4500/" }));
  app.use(proxy("/api/", { target: "http://localhost:4500/" }));
  app.use(proxy("/LandingPage/", { target: "http://localhost:4500/" }));
  //app.use(proxy("/profile/", { target: "http://localhost:4500/" }));
  app.use(proxy("/posts/", { target: "http://localhost:4500/" }));
};
