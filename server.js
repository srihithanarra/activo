/**
 * Created by srihitha.narra on 8/4/2017.
 */
var path = require("path");
var express = require("express");
var PORT = 3000;
var app = express();
var DIST_PATH = path.join(__dirname, "dist");

app.use(express.static(DIST_PATH));

//Sample home route
app.get("/home", function (req, res) {
    res.sendFile( path.join(DIST_PATH, "index.html"));
})

app.listen(PORT);