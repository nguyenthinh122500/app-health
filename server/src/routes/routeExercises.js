const express = require('express');
const { getListExercises, updateExercises, createExercises, searchExercisesByName } = require('../controllers/exercises');
const { deleteExercises } = require('../../server/src/controllers/exercises');
const routeExercises = express.Router();

routeExercises.get('/getlistexercises',getListExercises)
routeExercises.post('/updateexercises',updateExercises)
routeExercises.post('/createexercises',createExercises)

routeExercises.post('/searchexercisesname',searchExercisesByName)
routeExercises.delete('/deleteexercises/:exercise_id',deleteExercises)


module.exports = routeExercises
