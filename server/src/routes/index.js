const express = require("express");
const routeUser = require("./routeUser");
const routeWorkout = require("./routeWorkout");
const routeCategory = require("./routeCategory");
const routeSelectWorkout = require("./routeSelectWorkout");
;
const routeExercises = require("./routeExercises");
const routeMeals = require("./routeMeals");

const routes = express.Router();

routes.use("/user", routeUser);
routes.use("/workout", routeWorkout);
routes.use("/category", routeCategory);
routes.use("/selectworkout", routeSelectWorkout);
routes.use("/meals", routeMeals);
routes.use("/exercises", routeExercises);

module.exports = routes;
