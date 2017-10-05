const express = require('express');
const router = express.Router();
const Event = require("../model/event");
const Q = require("q");
const mongoose = require("mongoose");
const Moment = require("moment");

router.get('/', (req, res)=>{
    Q.all([Event.find()
        .where('from').gt(new Date())
        .sort('from')
        .then(function (events) {
        return events;
    }), Event.findOne({})
        .where('from').gt(new Date())
        .sort('from')
        .then(function (next) {
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
});

router.get('/event/new', (req, res)=>{
    res.render('eventCreateEdit')
});

router.post('/event/new', (req, res)=>{
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
});

router.get('/events', (req, res)=>{
    Event.find(function (err, events) {
        res.render('events', {events});
    })
});


module.exports = router;