/**
 * Created by srihitha.narra on 8/4/2017.
 */
var path = require("path");
var express = require("express");
var PORT = 3000;
var app = express();
var DIST_PATH = path.join(__dirname, "dist");



app.use(express.static(DIST_PATH));
app.listen(PORT);

//Sample home route
app.get("/events", function (req, res) {
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
