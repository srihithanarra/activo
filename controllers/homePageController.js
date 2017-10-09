const Q = require("q");
const Event = require("../model/event");
const Moment = require("moment");

exports.homePage = (req, res) => {
    Q.all([Event.findAllUpcomingEvents(), Event.findNextEvent().then(function (next) {
        if (next == null) {
            console.log("next is null");
            return 0;
        }
        //return the time till the next event
        var now = new Date();
        var diff = Moment.duration(next.from - now);
        return diff;
    })])
        .then(function (eventDetails) {
                //render home
                res.render('home', {
                    'events': eventDetails[0],
                    'next': eventDetails[1],
                });
            },
            function (err) {
                res.send(err);
            }
        );
};
