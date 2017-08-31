/**************************
 ****** PACKAGES **********
 **************************/

var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = require("./config");
var routes = require("./routes/index");
/**************************
 *** CONFIGURATION ********
 **************************/

var PORT = 3000;
var DIST_PATH = path.join(__dirname, "dist");
var CSS_PATH = path.join(__dirname, "css");
console.log(CSS_PATH);

app.use(express.static(CSS_PATH));

//connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.database)
    .then(function(){console.log("Connection successful")})
    .catch(function () {
  console.log('connection failed');
});


//get info from POST or URL parameters
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//use routes
app.use('/', routes);


app.listen(PORT);
