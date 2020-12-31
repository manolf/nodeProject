const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id); //mongo DB Id
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//https://console.developers.google.com/
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    //old version

    // (accessToken, refreshToken, profile, done) => {
    //   console.log("access token", accessToken);
    //   console.log("refresh token", refreshToken);
    //   console.log("profile", profile);
    //check if userId already exists - only if not: create new record - PROMISE because of asynchronous operation
    // User.findOne({ googleId: profile.id }).then((existingUser) => {
    //   if (existingUser) {
    //     //record exists
    //     done(null, existingUser);
    //   } else {
    //     //record doesnt exist
    //     new User({ googleId: profile.id })
    //       .save()
    //       .then((user) => done(null, user));
    //   }
    // });

    //REFACTORED ES2017: await and async
    async (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
      const existingUser = await User.findOne({ googleId: profile.id });

      // if (existingUser) {
      //   //record exists
      //   done(null, existingUser);
      // } else {
      //   //record doesnt exist
      //   const user = await new User({ googleId: profile.id }).save();
      //   done(null, user);
      // }

      //without else
      if (existingUser) {

        return done(null, existingUser);
      }
  
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
