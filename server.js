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
var menu = require("./menu");
/**************************
 *** CONFIGURATION ********
 **************************/

var PORT = 3000;
var DIST_PATH = path.join(__dirname, "dist");
var CSS_PATH = path.join(__dirname, "css");

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


app.locals.siteName = 'Events';
app.locals.menu = menu;//TODO: check why res.locals was not working


//include css
app.use('/css', express.static(path.join(__dirname, 'css')));
//include fonts
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));
//include images
app.use('/images', express.static(path.join(__dirname, 'images')));


app.listen(PORT);
