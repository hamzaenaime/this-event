"use strict";

const config = require("./config");
const app = require("./config/application")(config);
const data = require("./data")();

require("./config/database")(config.connectionString);
require("./auth")(app, data);
require("./routers")(app, data);

app.start();

/*sss  bssssdsawq   1`jhbugtc345WZCTVBUIJO0K-PO9.EW\Q !qXSC HJKPL,!|ETYU
            #logo.col-sm-2
                a(href="/")
                    span.fa-stack
                        i.fa.logo-hex.fa-stack-2x
                        i.fa.logo-fa.fa-map-marker.fa-stack-2x

*/
