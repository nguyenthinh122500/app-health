const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const getListWorkout = async (req, res) => {
  try {
    const workouts = await models.WorkoutPlans.findAll({
      where: {
        status: {
          [Op.eq]: "active",
        },
      },
      include: [
        {
          model: models.PlanExercises,
          as: "PlanExercises",
          include: {
            model: models.Exercises,
            as: "exercise",
          },
        },
        {
          model: models.PlanMeals,
          as: "PlanMeals",
          include: {
            model: models.Meals,
            as: "meal",
          },
        },
        {
          model: models.DailyPlanDetails,
          as: "DailyPlanDetails",
          include: [
            {
              model: models.Exercises,
              as: "exercise",
            },
            {
              model: models.Meals,
              as: "meal",
            },
          ],
          order: [
            [
              sequelize.literal("CAST(DailyPlanDetails.day AS UNSIGNED)"),
              "ASC",
            ],
          ],
        },
      ],
    });

    // Kiểm tra nếu workouts không rỗng
    if (workouts && workouts.length > 0) {
      // Lặp qua từng kết quả và sắp xếp trường 'DailyPlanDetails'
      workouts.forEach((workout) => {
        workout.DailyPlanDetails.sort((a, b) => {
          const dayA = a.day;
          const dayB = b.day;
          if (dayA < dayB) {
            return -1;
          }
          if (dayA > dayB) {
            return 1;
          }
          return 0;
        });
      });

      succesCode(res, workouts, "Get Workout Successfully!!!");
    } else {
      res.status(404).json({ success: false, message: "No workout found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Backend error" });
  }
};

const getWorkoutByID = async (req, res) => {
  try {
    const { plan_id } = req.params;
    const workouts = await models.WorkoutPlans.findOne({
      where: { plan_id },
      include: [
        {
          model: models.PlanExercises,
          as: "PlanExercises",
          include: {
            model: models.Exercises,
            as: "exercise",
          },
        },
        {
          model: models.PlanMeals,
          as: "PlanMeals",
          include: {
            model: models.Meals,
            as: "meal",
          },
        },
        {
          model: models.DailyPlanDetails,
          as: "DailyPlanDetails",
          include: [
            {
              model: models.Exercises,
              as: "exercise",
            },
            {
              model: models.Meals,
              as: "meal",
            },
          ],
        },
      ],
    });

    if (workouts) {
      // Sắp xếp dữ liệu sau khi đã lấy được
      workouts.DailyPlanDetails.sort((a, b) => {
        const dayA = a.day;
        const dayB = b.day;
        if (dayA < dayB) {
          return -1;
        }
        if (dayA > dayB) {
          return 1;
        }
        return 0;
      });

      succesCode(res, workouts, "Get Workout Successfully!!!");
    } else {
      errorCode(res, "No workout found");
    }
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const suggestWorkout = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await models.Users.findOne({
      where: {
        user_id: user_id, // Thay user_id bằng giá trị cụ thể
      }
    });

    const fitnessLevel = user.message.split(":")[1].trim(); // Extract fitness_level from user.message

    const workouts = await models.WorkoutPlans.findAll({
      where: {
        fitness_level: { [Op.like]: fitnessLevel },
        status: 'active'
      },
      include: [
        {
          model: models.PlanExercises,
          as: "PlanExercises", // Modify the alias according to your model setup,
          include: {
            model: models.Exercises, // Include associated PlanExercises
            as: "exercise",
          },
        },
        {
          model: models.PlanMeals, // Include associated PlanExercises
          as: "PlanMeals", // Modify the alias according to your model setup,
          include: {
            model: models.Meals, // Include associated PlanExercises
            as: "meal",
          },
        },
        {
          model: models.DailyPlanDetails,
          as: "DailyPlanDetails",
          include: [
            {
              model: models.Exercises, // Assuming there's an 'Exercises' model
              as: "exercise",
            },
            {
              model: models.Meals, // Assuming there's a 'Meals' model
              as: "meal",
            },
          ],
        },
      ],
    });

    succesCode(res, workouts, "Successfully found workout plans.");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const getListWorkoutByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const workouts = await models.WorkoutPlans.findAll({
      where: { category_id: id ,  status: 'active'},
      include: [
        {
          model: models.PlanExercises,
          as: "PlanExercises",
          include: {
            model: models.Exercises,
            as: "exercise",
          },
        },
        {
          model: models.PlanMeals,
          as: "PlanMeals",
          include: {
            model: models.Meals,
            as: "meal",
          },
        },
        {
          model: models.DailyPlanDetails,
          as: "DailyPlanDetails",
          include: [
            {
              model: models.Exercises, // Assuming there's an 'Exercises' model
              as: "exercise",
            },
            {
              model: models.Meals, // Assuming there's a 'Meals' model
              as: "meal",
            },
          ],
        },
      ],
    });

    succesCode(res, workouts, "Successfully fetched workout plans!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const createWorkout = async (req, res) => {
  try {
    const {
      goal,
      total_time,
      fitness_level,
      plan_name,
      image,
      plan_meal,
      plan_exercises,
      category_id,
    } = req.body;
    const workout = await models.WorkoutPlans.create({
      plan_id: uuidv4(),
      goal,
      total_time,
      fitness_level,
      plan_name,
      image,
      category_id,
      status: "active",
    });

    const mealPromises = plan_meal.map(async (id) => {
      await models.PlanMeals.create({
        plan_id: workout.plan_id,
        meal_id: id,
      });
    });
    const exercisePromises = plan_exercises.map(async (id) => {
      await models.PlanExercises.create({
        plan_id: workout.plan_id,
        exercise_id: id,
      });
    });

    await Promise.all(mealPromises);
    await Promise.all(exercisePromises);
    succesCode(res, workout, "Creare Workout Successfully!!!");
  } catch (error) {
    return errorCode(res, "Backend error");
  }
};

const updateWorkout = async (req, res) => {
  try {
    const {
      plan_id,
      goal,
      total_time,
      fitness_level,
      plan_name,
      image,
      plan_meal,
      plan_exercises,
      category_id,
    } = req.body;

    // Kiểm tra xem plan_id có tồn tại không
    const existingWorkout = await models.WorkoutPlans.findByPk(plan_id);

    if (!existingWorkout) {
      return errorCode(res, "Workout not found"); // Trả về mã lỗi nếu plan_id không tồn tại
    }

    // Cập nhật thông tin cho bản ghi đã tồn tại
    const updatedWorkout = await models.WorkoutPlans.update(
      {
        goal,
        total_time,
        fitness_level,
        plan_name,
        image,
        category_id,
      },
      {
        where: {
          plan_id: plan_id,
        },
      }
    );

    // Cập nhật danh sách meal và exercise
    const mealPromises = plan_meal.map(async (id) => {
      await models.PlanMeals.findOrCreate({
        where: { plan_id: plan_id, meal_id: id },
      });
    });

    const exercisePromises = plan_exercises.map(async (id) => {
      await models.PlanExercises.findOrCreate({
        where: { plan_id: plan_id, exercise_id: id },
      });
    });

    await Promise.all(mealPromises);
    await Promise.all(exercisePromises);

    succesCode(res, updatedWorkout, "Update Workout Successfully!!!");
  } catch (error) {
     errorCode(res, "Backend error");
  }
};
const updateWorkout1 = async (req, res) => {
  try {
    const {
      plan_id,
      goal,
      total_time,
      fitness_level,
      plan_name,
      image,
      category_id,
    } = req.body;

    // Kiểm tra xem plan_id có tồn tại không
    const existingWorkout = await models.WorkoutPlans.findByPk(plan_id);

    if (!existingWorkout) {
      return errorCode(res, "Workout not found"); // Trả về mã lỗi nếu plan_id không tồn tại
    }

    // Cập nhật thông tin cho bản ghi đã tồn tại
    const updatedWorkout = await models.WorkoutPlans.update(
      {
        goal,
        total_time,
        fitness_level,
        plan_name,
        image,
        category_id,
      },
      {
        where: {
          plan_id: plan_id,
        },
      }
    );

    // Cập nhật danh sách meal và exercise
   

    succesCode(res, updatedWorkout, "Update Workout Successfully!!!");
  } catch (error) {
     errorCode(res, "Backend error");
  }
};
const deletePlanMeal = async (req, res) => {
  try {
    let { id } = req.params;
    const planmeal = await models.PlanMeals.destroy({ where: { id } });
    succesCode(res, planmeal, "Delete PlanMeal Successfully!!!");
  } catch (error) {
    return errorCode(res, "Backend error");
  }
};

const deletePlanExercises = async (req, res) => {
  try {
    let { id } = req.params;
    const planmeal = await models.PlanExercises.destroy({ where: { id } });
    succesCode(res, planmeal, "Delete PlanExercises Successfully!!!");
  } catch (error) {
    return errorCode(res, "Backend error");
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const { plan_id } = req.params;
    const workout = await models.WorkoutPlans.update(
      { status: "inactive" },
      {
        where: { plan_id },
      }
    );
    succesCode(res, workout, "Update Workout Successfully!!!");
  } catch (error) {
    return errorCode(res, "Backend error");
  }
};

const searchWorkoutByName = async (req, res) => {
  let { plan_name } = req.body;
  try {
    const workout = await models.WorkoutPlans.findAll({
      where: {
        plan_name: {
          [Op.like]: `%${plan_name}%`, // Sử dụng Op.like thay vì Op.iLike
        },
      },
    });

    if (workout.length === 0) {
      return failCode(res, "No workout found with this name");
    }

    succesCode(res, workout, "Found workout by name successfully!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const createPlanDaily = async (req, res) => {
  let { plan_daily } = req.body;
  try {
    // Assuming plan_daily is an array of objects with required data for DailyPlanDetails
    const createdDetails = await models.DailyPlanDetails.bulkCreate(plan_daily);

    // If needed, you can handle the response accordingly
    res.status(200).json({
      message: "DailyPlanDetails created successfully",
      createdDetails,
    });
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const deletePlanDaily = async (req, res) => {
  let { detail_id } = req.params;
  try {
    const plan = await models.DailyPlanDetails.destroy({
      where: { detail_id },
    });
    res
      .status(200)
      .json({ message: "DailyPlanDetails delete successfully", plan });
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};
module.exports = {
  suggestWorkout,
  getListWorkout,
  getListWorkoutByCategory,
  getWorkoutByID,
  createWorkout,
  updateWorkout,
  deletePlanExercises,
  deletePlanMeal,
  deleteWorkout,
  searchWorkoutByName,
  createPlanDaily,
  deletePlanDaily,
  updateWorkout1
};
