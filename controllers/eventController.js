const Event = require("../model/event");

//render create event form
exports.createEventForm = (req, res)=>{
    res.render('eventCreateEdit')
};

//create new event
exports.createEvent = (req, res)=>{
    Event.createNewEvent(req.body.title, new Date(req.body.when + " " + req.body.from), new Date(req.body.when + " " + req.body.to), req.body.where)
    .then(item => {res.send(item)})
    .catch(err => {res.status(400).send("unable to save to DB")});
};

//list all events
exports.listAllEvents = (req, res)=>{
   Event.listAllEvents().then(function (events) {
       res.render('events', {events});
   })
}
