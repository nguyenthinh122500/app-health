const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const getListMeal = async (req, res) => {
  try {
    const meal = await models.Meals.findAll({});

    succesCode(res, meal, "Get List Meal Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const searchMealByName = async (req, res) => {
  let { mealName } = req.body;

  // // Chuẩn hóa chuỗi Unicode
  // mealName = mealName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
console.log(mealName)
  try {
    const meals = await models.Meals.findAll({
      where: {
        meal_name: {
          [Op.like]: `%${mealName}%` // Sử dụng Op.like thay vì Op.iLike
        }
      }
    });

    if (meals.length === 0) {
      return failCode(res, "No meals found with this name");
    }

    succesCode(res, meals, "Found meals by name successfully!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};


const updateMeal = async (req, res) => {
  try {
    const { meal_id, meal_name, description, calories, image } = req.body;
    const meal = await models.Meals.update(
      {
        meal_name,
        description,
        calories,
        image,
      },
      { where: { meal_id } }
    );

    succesCode(res, meal, "Update Meal Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const createMeal = async (req, res) => {
  try {
    const { meal_name, description, calories, image } = req.body;
    const meal = await models.Meals.create({
      meal_id: uuidv4(),
      meal_name,
      description,
      calories,
      image,
    });

    succesCode(res, meal, "Create Meal Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};
module.exports = { getListMeal, updateMeal, createMeal , searchMealByName};
