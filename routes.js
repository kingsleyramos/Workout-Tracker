const express = require('express');
const router  = express.Router();

module.exports = function(app){
	//html routes
	const application = require('./routes/application');
	//api routes
	const apiUsers = require('./routes/users');
	const apiWorkouts = require('./routes/workouts');

	// html routes
	// app.use('/', application);
	// api routes
	app.use('/api/users', apiUsers);
	app.use('/api/workouts', apiWorkouts);

}