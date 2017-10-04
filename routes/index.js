const express = require('express');
const router = express.Router();
const Event = require("../model/event");

router.get('/', (req, res)=>{
    Event.find(function (err, events) {
        res.render('home', {events});
    })
});

router.get('/event/new', (req, res)=>{
    res.render('eventCreateEdit')
});

router.post('/event/new', (req, res)=>{
    var newEvent = new Event(req.body);
    newEvent.save()
        .then(item => {res.send("Event created")})
        .catch(err => {res.status(400).send("unable to save to DB")});
    res.send('Created event');
});

router.get('/events', (req, res)=>{
    Event.find(function (err, events) {
        res.render('events', {events});
    })
});


module.exports = router;