"use strict";

const TwitterStrategy = require("passport-twitter").Strategy;

const TWITTER = {
  TWITTER_APP_ID: process.env.TWITTER_APP_ID,
  TWITTER_APP_SECRET: process.env.TWITTER_APP_SECRET,
  callbackURL: "http://thiseventensat.herokuapp.com/auth/twitter/callback"
};
module.exports = function(passport, data) {
  const TwitterAuthStrategy = new TwitterStrategy(
    {
      consumerKey: TWITTER.TWITTER_APP_ID,
      consumerSecret: TWITTER.TWITTER_APP_SECRET,
      callbackURL: TWITTER.callbackURL,
      passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, done) => {
      process.nextTick(function() {
        data.getUserByTwitterId(profile.id).then(user => {
          if (user) {
            return done(null, user);
          } else {
            data
              .createUser({
                firstName: profile.username || "",
                lastName: profile.username || "",
                email: profile.displayName + "@twitter.com",
                username: profile.username + "" + profile.id,
                avatarUrl: profile.photos[0].value,
                socialLogins: {
                  twitter: {
                    email: profile.displayName + "@twitter.com",
                    id: profile.id,
                    token: accessToken,
                    name: profile.username,
                    picture: profile.photos[0].value
                  }
                }
              })
              .then(user => {
                return done(null, user);
              });
          }
        });
      });
    }
  );

  passport.use(TwitterAuthStrategy);
};
