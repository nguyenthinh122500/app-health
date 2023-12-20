const DataTypes = require("sequelize").DataTypes;
const _Category = require("./Category");
const _DailyPlanDetails = require("./DailyPlanDetails");
const _Exercises = require("./Exercises");
const _Meals = require("./Meals");
const _PlanExercises = require("./PlanExercises");
const _PlanMeals = require("./PlanMeals");
const _UserSelectedPlans = require("./UserSelectedPlans");
const _Users = require("./Users");
const _WorkoutPlans = require("./WorkoutPlans");

function initModels(sequelize) {
  const Category = _Category(sequelize, DataTypes);
  const DailyPlanDetails = _DailyPlanDetails(sequelize, DataTypes);
  const Exercises = _Exercises(sequelize, DataTypes);
  const Meals = _Meals(sequelize, DataTypes);
  const PlanExercises = _PlanExercises(sequelize, DataTypes);
  const PlanMeals = _PlanMeals(sequelize, DataTypes);
  const UserSelectedPlans = _UserSelectedPlans(sequelize, DataTypes);
  const Users = _Users(sequelize, DataTypes);
  const WorkoutPlans = _WorkoutPlans(sequelize, DataTypes);

  WorkoutPlans.belongsTo(Category, { as: "category", foreignKey: "category_id"});
  Category.hasMany(WorkoutPlans, { as: "WorkoutPlans", foreignKey: "category_id"});
  DailyPlanDetails.belongsTo(Exercises, { as: "exercise", foreignKey: "exercise_id"});
  Exercises.hasMany(DailyPlanDetails, { as: "DailyPlanDetails", foreignKey: "exercise_id"});
  PlanExercises.belongsTo(Exercises, { as: "exercise", foreignKey: "exercise_id"});
  Exercises.hasMany(PlanExercises, { as: "PlanExercises", foreignKey: "exercise_id"});
  DailyPlanDetails.belongsTo(Meals, { as: "meal", foreignKey: "meal_id"});
  Meals.hasMany(DailyPlanDetails, { as: "DailyPlanDetails", foreignKey: "meal_id"});
  PlanMeals.belongsTo(Meals, { as: "meal", foreignKey: "meal_id"});
  Meals.hasMany(PlanMeals, { as: "PlanMeals", foreignKey: "meal_id"});
  UserSelectedPlans.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(UserSelectedPlans, { as: "UserSelectedPlans", foreignKey: "user_id"});
  DailyPlanDetails.belongsTo(WorkoutPlans, { as: "plan", foreignKey: "plan_id"});
  WorkoutPlans.hasMany(DailyPlanDetails, { as: "DailyPlanDetails", foreignKey: "plan_id"});
  PlanExercises.belongsTo(WorkoutPlans, { as: "plan", foreignKey: "plan_id"});
  WorkoutPlans.hasMany(PlanExercises, { as: "PlanExercises", foreignKey: "plan_id"});
  PlanMeals.belongsTo(WorkoutPlans, { as: "plan", foreignKey: "plan_id"});
  WorkoutPlans.hasMany(PlanMeals, { as: "PlanMeals", foreignKey: "plan_id"});
  UserSelectedPlans.belongsTo(WorkoutPlans, { as: "plan", foreignKey: "plan_id"});
  WorkoutPlans.hasMany(UserSelectedPlans, { as: "UserSelectedPlans", foreignKey: "plan_id"});

  return {
    Category,
    DailyPlanDetails,
    Exercises,
    Meals,
    PlanExercises,
    PlanMeals,
    UserSelectedPlans,
    Users,
    WorkoutPlans,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
