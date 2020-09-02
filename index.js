var express= require("express");
var bodyParser = require("body-parser");

var app = express();

app.set("view engine","ejs");

app.set("/assets",express.static("./assets/css"));


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

require("./controllers/todoController")(app,urlencodedParser);

app.listen(3000);