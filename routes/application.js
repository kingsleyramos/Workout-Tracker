const express = require('express');
const router = express.Router();

var isAuthenticated = require("../config/middleware/isAuthenticated");

var application_controller = require('../controllers/application_controller');

//router.get('/', isAuthenticated, application_controller.index);
router.get('/', application_controller.login);
router.get('/register', application_controller.register);
router.get('/home', isAuthenticated, application_controller.home);
router.get('/workouts/', isAuthenticated, application_controller.workouts);
router.get('/workout/edit/:id', isAuthenticated, application_controller.workout);

module.exports = router;