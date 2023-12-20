const express = require('express');
const { userChooseWorkout, deleteChooseWorkout } = require('../controllers/selectWorkout');
const routeSelectWorkout = express.Router();

routeSelectWorkout.post('/createchooseworkout',userChooseWorkout)
routeSelectWorkout.delete('/deletechooseworkout/:selection_id/:user_id',deleteChooseWorkout)




module.exports = routeSelectWorkout