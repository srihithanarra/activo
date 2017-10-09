var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: String,
    from: Date,
    to: Date,
    where: String,
});

var Event = mongoose.model('Event', eventSchema);

Event.findAllUpcomingEvents = function () {
    return Event.find()
        .where('from').gt(new Date())
        .sort('from')
        .then(function (events) {
            //return all upcoming events
            return events;
        });
};

Event.findNextEvent = function () {
    return Event.findOne({})
        .where('from').gt(new Date())
        .sort('from')
        .then(function (next) {
            //return the next event
            return next;
        }, function (err) {
            return err;
        })
}

Event.createNewEvent = function (title, from, to, where) {
    var newEvent = new Event({
        title: title,
        from: from,
        to: to,
        where: where,
    });
    return newEvent.save();
}

Event.listAllEvents = function () {
    return  Event.find(function (err, events) {
       return events;
    })
}
module.exports = Event;