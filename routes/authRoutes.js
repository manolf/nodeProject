const passport = require("passport");

module.exports = (app) => {
  //Route handler
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  //Route handler for Cannot GET /auth/google/callback
  app.get("/auth/google/callback", passport.authenticate("google"));
};
