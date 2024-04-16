const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const skillsController = require('../controllers/skillsController');
const authController = require('../controllers/authController');


// User routes
router.get('/currentuser/:userId', userController.getCurrentUser);
router.post('/update', userController.updateUser);
router.get('/getfullnames', userController.getFullNames);
router.get('/sendmail', userController.sendEmail);

// Event routes
router.post('/createevent', eventController.createEvent);
router.get('/displayevents', eventController.displayEvents);
router.post('/editevent/:eventId', eventController.editEvent);
router.post('/deleteevent/:eventId', eventController.deleteEvent);
router.get('/fetch-event/:eventId', eventController.getEventById);
router.post('/acceptevent/:eventId', eventController.registerEvent);
router.post('/likeevent/:eventId', eventController.likeEvent);
router.post('/deletelikeevent/:eventId', eventController.unlikeEvent);
router.get('/registeredevents/:userId/display', eventController.DisplayregisteredEvents);
router.get('/likedevents/:userId/display', eventController.DisplaylikeEvents);

// Skills routes
router.post('/createskills/:userId', skillsController.createSkills);
router.get('/displayskills/:userId', skillsController.displaySkills);
// router.post('/editskills/:userId/:skillId', skillsController.editSkills);
// router.post('/deleteskills/:skillId', skillsController.deleteSkills);

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/changepassword', authController.changePassword);

module.exports = router;
