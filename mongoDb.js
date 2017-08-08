var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongoUrl = 'mongodb://localhost:27017/test';

var connection = MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    findRestaurants(db, function () {
        db.close();
    });
});

module.exports = connection;