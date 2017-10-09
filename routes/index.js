const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const homeController = require('../controllers/homePageController');
const eventController = require('../controllers/eventController');

router.get('/', homeController.homePage);
router.get('/event/new', eventController.createEventForm);
router.post('/event/new', eventController.createEvent);
router.get('/events', eventController.listAllEvents);

module.exports = router;