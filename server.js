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
var config = require("./config")
var User = require("./api/models/user");

/**************************
 *** CONFIGURATION ********
 **************************/

var PORT = 3000;
var DIST_PATH = path.join(__dirname, "dist");


app.use(express.static(DIST_PATH));
//connect to database
mongoose.connect(config.database);
app.set('superSecret', config.secret); // secret variable

//get info from POST or URL parameters
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//Create sample user route
app.get('/setup-admin-user', function(req, res){
    var nick = new User({
        name: 'admin',
        password: 'password',
    });
    //save the user
    nick.save(function(err){
        if (err) throw err;
        console.log("user saved successfully");
        res.json({success: true});
    });
});


//Sample home route
app.get("/test", function (req, res) {
  res.json({
      events: [
      {
          'day' : 1,
         'title': 'Learning Tuesdays',
         'start_time' : '11:00AM',
         'end_time' : '12:00AM',
     },
     {
         'day' : 2,
         'title': 'Fun Wednesday',
         'start_time' : '4:00PM',
         'end_time' : '5:00PM',
     },
  ]});
})

//get an instance of routes
var appRoutes = express.Router();

appRoutes.use(function(req, res, next) {
    // check header or post parameters for token
    var token = req.body.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    }
    else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

//return all users
appRoutes.get('/users', function (req, res) {
    User.find({}, function (err, users){
        res.json(users);
    });
});

//authenticate user
appRoutes.post('/authenticate', function (req, res) {
   //find the user
    User.findOne({
        name: req.body.name
    }, function (err,user) {
       if (err) throw err;
       console.log(user);
       if (!user) {
           //user not found
           res.json({success: false, message: 'Authentication failed. User not found.'});
       }
       else {
           //check if password matches
           if (user.password != req.body.password) {
               res.json({success: false, message: 'Authentication failed. Username and password does not match.'});
           }
           else {
               //username, password matches. Create token
               var token = jwt.sign(user, app.get('superSecret'), {
                   expiresIn: 60*60*24
                });

               res.json({
                   success: true,
                   message: 'Here is your token',
                   token: token,
               });
           }
       }
    });
});
app.use('/app', appRoutes);

app.listen(PORT);
