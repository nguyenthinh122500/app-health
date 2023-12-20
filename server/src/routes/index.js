const express = require("express");
const routeUser = require("./routeUser");
const routeWorkout = require("./routeWorkout");
const routeCategory = require("./routeCategory");
const routeSelectWorkout = require("./routeSelectWorkout");
const routeMeals = require("./routeMeals");
const routeExercises = require("./routeExercises");

const routes = express.Router();

routes.use("/user", routeUser);
routes.use("/workout", routeWorkout);
routes.use("/category", routeCategory);
routes.use("/selectworkout", routeSelectWorkout);
routes.use("/meals", routeMeals);
routes.use("/exercises", routeExercises);

module.exports = routes;
