const express = require('express');
const router  = express.Router();
const passport = require('../config/passport');

const user_controller = require ("../controllers/user_controller");

// routes
router.post('/register', user_controller.register);
router.post('/login', passport.authenticate('local'
//, { failureFlash: 'Invalid username or password.' }
), 
user_controller.login);
router.get('/logout', user_controller.logout);

// Export Router
module.exports = router;
