var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongoUrl = 'mongodb://localhost:27017/test';


var connection = MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err, 'connection could not be made');
    insertDocument(db, function() {
        db.close();
    });
});

/*var connection = MongoClient.connect(mongoUrl, function(err, db) {
 assert.equal(null, err);
 findRestaurants(db, function () {
 db.close();
 });
 });*/

var findRestaurants = function(db, callback) {
    var cursor =db.collection('restaurants').find({"name": "Vella"} );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

var insertDocument = function(db, callback) {
    db.collection('restaurants').insertOne({
        "address" : {
            "street" : "2 Avenue",
            "zipcode" : "10075",
            "building" : "1480",
            "coord" : [ -73.9557413, 40.7720266 ]
        },
        "borough" : "Manhattan",
        "cuisine" : "Italian",
        "grades" : [
            {
                "date" : new Date("2014-10-01T00:00:00Z"),
                "grade" : "A",
                "score" : 11
            },
            {
                "date" : new Date("2014-01-16T00:00:00Z"),
                "grade" : "B",
                "score" : 17
            }
        ],
        "name" : "Vella",
        "restaurant_id" : "41704620"
    }, function (err, result)  {
        assert.equal(err,null).failure();
        console.log("Inserted a document");
        console.dir(JSON.stringify(result.insertedId));
        callback();
    });
}


module.exports = connection;