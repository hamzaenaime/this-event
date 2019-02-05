"use strict";

const GooglePlusStrategy = require("passport-google-oauth").OAuth2Strategy;

const GOOGLEPLUS = {
  GOOGLE_APP_ID:
    "737113597557-14veo69rha2f0ju662h3vpstu6ame6iq.apps.googleusercontent.com",
  GOOGLE_APP_SECRET: "yem0_dYhnQrp-hqw3Wr66cU4",
  callbackURL: "http://localhost:3003/auth/google/callback" 
};

module.exports = function(passport, data) {
  const GoogleAuthStrategy = new GooglePlusStrategy(
    {
      clientID: GOOGLEPLUS.GOOGLE_APP_ID,
      clientSecret: GOOGLEPLUS.GOOGLE_APP_SECRET,
      callbackURL: GOOGLEPLUS.callbackURL,
      passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, done) => {
      process.nextTick(function() {
        data.getUserByGoogleplusId(profile.id).then(user => {
          if (user) {
            return done(null, user);
          } else {
            data
              .createUser({
                firstName: profile.name.givenName || "",
                lastName: profile.name.familyName || "",
                email: profile.emails[0].value,
                username:
                  profile.name.givenName +
                  "" +
                  profile.name.familyName +
                  "" +
                  profile.id,
                avatarUrl: profile.photos[0].value,
                socialLogins: {
                  googlePlus: {
                    email: profile.emails[0].value,
                    id: profile.id,
                    token: accessToken,
                    name:
                      profile.name.givenName + " " + profile.name.familyName,
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
  passport.use(GoogleAuthStrategy);
};
