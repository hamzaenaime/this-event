"use strict";

const mongoose = require("mongoose");

module.exports = function(connectionString) {
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://thisevent:thisevent123456@ds245277.mlab.com:45277/thisevent", {
  useMongoClient: true,
  /* other options */
});
};
