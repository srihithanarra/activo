//render create event form
exports.createEventForm = (req, res)=>{
    res.render('eventCreateEdit')
};

//create event
exports.createEvent = (req, res)=>{
    //save new event
    var newEvent = new Event({
        title: req.body.title,
        from: new Date(req.body.when + " " + req.body.from),
        to: new Date(req.body.when + " " + req.body.to),
        where: req.body.where,
    });
    newEvent.save()
        .then(item => {res.send(item)})
        .catch(err => {res.status(400).send("unable to save to DB")});
    res.send(newEvent);
};

//list all events
exports.listAllEvents = (req, res)=>{
    Event.find(function (err, events) {
        res.render('events', {events});
    })
}
