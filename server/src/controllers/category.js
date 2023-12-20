const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");


const getListCategory = async (req, res) => {
  try {
    const workouts = await models.Category.findAll({
    
    });

    succesCode(res, workouts, "Get List Category Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};


module.exports = {getListCategory}