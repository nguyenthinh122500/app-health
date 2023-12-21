const express = require('express');
const { getListExercises, updateExercises, createExercises, searchExercisesByName, deleteExercises } = require('../controllers/exercises');const routeExercises = express.Router();

routeExercises.get('/getlistexercises',getListExercises)
routeExercises.post('/updateexercises',updateExercises)
routeExercises.post('/createexercises',createExercises)

routeExercises.post('/searchexercisesname',searchExercisesByName)
routeExercises.delete('/deleteexercises/:exercise_id',deleteExercises)


module.exports = routeExercises
