const express = require('express');
const { getListExercises, updateExercises, createExercises, searchExercisesByName } = require('../controllers/exercises');
const routeExercises = express.Router();

routeExercises.get('/getlistexercises',getListExercises)
routeExercises.post('/updateexercises',updateExercises)
routeExercises.post('/createexercises',createExercises)

routeExercises.post('/searchexercisesname',searchExercisesByName)


module.exports = routeExercises
