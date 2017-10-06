const Q = require("q");
const Event = require("../model/event");

exports.homePage = (req, res)=>{
    console.log("homePage");
    Q.all([Event.find()
        .where('from').gt(new Date())
        .sort('from')
        .then(function (events) {
            //return all upcoming events
            return events;
        }), Event.findOne({})
        .where('from').gt(new Date())
        .sort('from')
        .then(function (next) {
            //return the next event
            var now = new Date();
            var diff = Moment.duration(next.from - now);
            return (diff);
        })])
        .then(function(eventDetails){
                //render home
                res.render('home',{
                    'events': eventDetails[0],
                    'next': eventDetails[1],
                });
            },
            function (err) {
                res.send(err);
            }
        );
};
