const express = require('express');
const { getListMeal, updateMeal, createMeal, searchMealByName, deleteMeal } = require('../controllers/meal');

const routeMeals = express.Router();

routeMeals.get('/getlistmeals',getListMeal)
routeMeals.post('/updatemeal',updateMeal)
routeMeals.post('/createmeal',createMeal)
routeMeals.post('/searchmealname',searchMealByName)
routeMeals.delete('/deletemeal/:meal_id',deleteMeal)




module.exports = routeMeals