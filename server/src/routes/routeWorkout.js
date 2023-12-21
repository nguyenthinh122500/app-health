const express = require('express');
const { suggestWorkout, getListWorkout, getListWorkoutByCategory, getWorkoutByID, createWorkout, updateWorkout, deletePlanMeal, deletePlanExercises, deleteWorkout, searchWorkoutByName, createPlanDaily, deletePlanDaily, updateWorkout1 } = require('../controllers/workout');
const routeWorkout = express.Router();


routeWorkout.get('/suggestworkout/:user_id',suggestWorkout)
routeWorkout.get('/getlistworkout',getListWorkout)
routeWorkout.get('/getlistworkoutbycategory/:id',getListWorkoutByCategory)
routeWorkout.get('/getworkoutbyid/:plan_id',getWorkoutByID)
routeWorkout.post('/createworkout',createWorkout)
routeWorkout.post('/updateworkout',updateWorkout)
routeWorkout.post('/updateworkout1',updateWorkout1)
routeWorkout.delete('/deleteplanmeal/:id',deletePlanMeal)
routeWorkout.delete('/deleteplanexercises/:id',deletePlanExercises)
routeWorkout.put('/deleteworkout/:plan_id',deleteWorkout)
routeWorkout.post('/searchworkout',searchWorkoutByName)



routeWorkout.post('/createplandaily',createPlanDaily)
routeWorkout.delete('/deleteplandaily/:detail_id',deletePlanDaily)




module.exports = routeWorkout