const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const getListExercises = async (req, res) => {
  try {
    const exercises = await models.Exercises.findAll({});

    succesCode(res, exercises, "Get List Exercises Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};


const searchExercisesByName = async (req, res) => {
  let { exercisesName } = req.body;

  // // Chuẩn hóa chuỗi Unicode
  // exercisesName = exercisesName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
console.log(exercisesName)
  // try {
    const exercises = await models.Exercises.findAll({
      where: {
        exercise_name: {
          [Op.like]: `%${exercisesName}%` // Sử dụng Op.like thay vì Op.iLike
        }
      }
    });

    if (exercises.length === 0) {
      return failCode(res, "No exercises found with this name");
    }

    succesCode(res, exercises, "Found exercises by name successfully!");
  // } catch (error) {
  //   console.error("Error:", error);
  //   return errorCode(res, "Backend error");
  // }
};


const updateExercises = async (req, res) => {
  try {
    const { exercise_id, exercise_name,video_url, description,  image } = req.body;
    const exercises = await models.Exercises.update(
      {
        exercise_name,
        description,
        video_url,
        image,
      },
      { where: { exercise_id } }
    );

    succesCode(res, exercises, "Update Exercises Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const createExercises = async (req, res) => {
  try {
    const { exercise_name,video_url, description,  image } = req.body;
    const exercises = await models.Exercises.create(
      {
        exercise_id: uuidv4(),
        exercise_name,
        description,
        video_url,
        image,
      }
    );

    succesCode(res, exercises, "Create Exercises Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const deleteExercises = async (req, res) => {
  let { exercise_id } = req.params;

  try {
    const planMealExists = await models.PlanExercises.findOne({
      where: {
        exercise_id: exercise_id,
      },
    });

    // Kiểm tra xem exercise_id có tồn tại trong bảng DailyPlanDetails không
    const dailyPlanDetailExists = await models.DailyPlanDetails.findOne({
      where: {
        exercise_id: exercise_id,
      },
    });


    // Nếu exercise_id không tồn tại trong cả PlanMeals và DailyPlanDetails, thực hiện xóa
    if (!planMealExists && !dailyPlanDetailExists) {
      const exercises = await models.Exercises.destroy({ where: { exercise_id } });
      return succesCode(res, exercises, "Xóa thành công");
    } else {
      return failCode(
        res,
        `Không thể xóa bài tập do nằm trong dữ liệu đã dùng`
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};
module.exports = { getListExercises, updateExercises, createExercises , searchExercisesByName, deleteExercises};
