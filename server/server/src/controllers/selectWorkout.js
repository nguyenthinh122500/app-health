const moment = require("moment");
const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");


const userChooseWorkout = async (req, res) => {
  try {
    const {user_id,plan_id}= req.body
    const workouts = await models.UserSelectedPlans.create({
        selection_id:uuidv4(),
        user_id,
        plan_id,
        workout_date: moment().toDate(),
    });

    succesCode(res, workouts, "Choose a successful workout plan!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};


const deleteChooseWorkout = async (req, res) => {
  try {
    const { user_id, selection_id } = req.params;

    // Check if the selection_id belongs to the user_id
    const workoutToDelete = await models.UserSelectedPlans.findOne({
      where: { user_id, selection_id },
    });

    if (!workoutToDelete) {
      return errorCode(res, "Selection ID not found for this user");
    }

    // If the selection_id belongs to the user, delete the workout plan
    await models.UserSelectedPlans.destroy({
      where: { selection_id },
    });

    succesCode(res, null, "Successfully deleted workout plan!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};
module.exports = {userChooseWorkout, deleteChooseWorkout}