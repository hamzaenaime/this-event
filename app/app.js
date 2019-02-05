"use strict";

const config = require("./config");
const app = require("./config/application")(config);
const data = require("./data")();

require("./config/database")(config.connectionString);
require("./auth")(app, data);
require("./routers")(app, data);

app.start();
