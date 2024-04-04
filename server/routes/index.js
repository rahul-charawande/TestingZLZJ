const express = require('express');
const router = express.Router();
const upcomingEventController = require('../controllers/upcomingEventController');

router.get('/getUpcomingEvents', upcomingEventController.getUpcomingEvents);
router.post('/addUpcomingEvent', upcomingEventController.addUpcomingEvent);

module.exports = router;
