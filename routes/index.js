const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Moment = require("moment");
const homeController = require('../controllers/homePageController');
const eventController = require('../controllers/eventController');
const Q = require("q");
const Event = require("../model/event");

router.get('/', homeController.homePage);
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
router.get('/events', eventController.listAllEvents);

module.exports = router;