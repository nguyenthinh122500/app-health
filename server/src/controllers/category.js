const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const getListCategory = async (req, res) => {
  try {
    const category = await models.Category.findAll({});

    succesCode(res, category, "Get List Category Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};
const updateCategory = async (req, res) => {
  try {
    const { category_id, category_name, description, image } = req.body;
    const category = await models.Category.update(
      {
        category_name,
        description,
        image,
      },
      { where: { category_id } }
    );

    succesCode(res, category, "Update Category Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};
const createCategory = async (req, res) => {
  try {
    const { category_name, description, image } = req.body;
    const category = await models.Category.create({
      category_id: uuidv4(),
      category_name,
      description,
      image,
    });

    succesCode(res, category, "Create Category Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const category = await models.WorkoutPlans.findOne({
      where: { category_id },
    });
    if (category) {
      failCode(res, "Không thể xóa loại kế hoạch, dữ liệu đang được sử dụng");
    } else {
      const data = await models.Category.destroy({ where: { category_id } });

      succesCode(res, category, "Delete Category Successfully!!!");
    }
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};



const searchCategoryByName = async (req, res) => {
  let { category_name } = req.body;

  // // Chuẩn hóa chuỗi Unicode
  // category_name = category_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
console.log(category_name)
  try {
    const category = await models.Category.findAll({
      where: {
        category_name: {
          [Op.like]: `%${category_name}%` // Sử dụng Op.like thay vì Op.iLike
        }
      }
    });

    if (category.length === 0) {
      return failCode(res, "No category found with this name");
    }

    succesCode(res, category, "Found category by name successfully!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};
module.exports = { getListCategory, createCategory, updateCategory, deleteCategory, searchCategoryByName };
