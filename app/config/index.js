"use strict";
let connectionStrings = {
  production: process.env.CONNECTION_STRING,
  development:
    "mongodb://thisevent:thisevent123456@ds245277.mlab.com:45277/thisevent"
};

// TODO: SET SESSION_SECRET AND CONNECTION_STRING CONSTANTS
module.exports = {
  environment: process.env.NODE_ENV || "development",
  connectionString: connectionStrings[process.env.NODE_ENV || "development"],
  port: process.env.PORT || 3003,
  sessionSecret: process.env.SESSION_SECRET || "[session_secret]"
};
