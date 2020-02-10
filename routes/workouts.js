const express = require('express');
const router  = express.Router();

//require controller here
const workout_controller = require("../controllers/workout_controller");

//authentication middleware
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get('/', isAuthenticated, workout_controller.getAll);
router.get('/:id', isAuthenticated, workout_controller.getOne);
router.put('/:id', isAuthenticated, workout_controller.editOne);
router.post('/', isAuthenticated, workout_controller.addOne);
router.delete('/:id', isAuthenticated, workout_controller.deleteOne);

module.exports = router;