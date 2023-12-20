const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { email, password, phone_number, height, weight, full_name, image } =
      req.body;

    // Kiểm tra xem email hoặc số điện thoại đã tồn tại trong cơ sở dữ liệu chưa
    const existingEmailUser = await models.Users.findOne({ where: { email } });

    if (existingEmailUser) {
      return failCode(res, "Email already exists in the system.");
    } else {
      // Sử dụng bcrypt để băm mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10); // 10 là số vòng lặp để tạo salt

      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);

      let message = `Your BMI is ${bmi.toFixed(2)}. `;

      if (bmi < 18.5) {
        message +=
          "You may be facing issues with being underweight: Underweight";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        message += "Ideal range for good health: Normal";
      } else if (bmi >= 25 && bmi <= 29.9) {
        message += "Attention needed for weight loss: Overweight";
      } else if (bmi >= 30 && bmi <= 34.9) {
        message += "Weight loss measures required: Obese Level I";
      } else if (bmi >= 35 && bmi <= 39.9) {
        message +=
          "Support and treatment from an expert needed: Obese Level II";
      } else {
        message +=
          "Immediate medical intervention and consultation needed: Obese Level III";
      }

      const user = await models.Users.create({
        user_id: uuidv4(),
        full_name,
        password: hashedPassword,
        phone_number,
        email,
        height,
        weight,
        health_index: bmi,
        message,
        image,
        status: "active",
      });

      succesCode(res, user, "User has been created successfully.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Backend error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng dựa trên email
    const user = await models.Users.findOne({ where: { email } });

    if (!user) {
      return failCode(res, "Email does not exist in the system.");
    }

    // So sánh mật khẩu được nhập với mật khẩu đã lưu trong cơ sở dữ liệu
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return failCode(res, "Incorrect password.");
    }
    if (user.status === "banned") {
      return failCode(res, "Your account has been banned.");
    }
    succesCode(res, user, "Login successful.");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id, email, phone_number, height, weight, full_name, image } =
      req.body;

    const existingEmailUser = await models.Users.findOne({ where: { email } });

    if (existingEmailUser && existingEmailUser.user_id !== user_id) {
      return failCode(res, "Email đã tồn tại trong hệ thống.");
    } else {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);

      let message = `Your BMI is ${bmi.toFixed(2)}. `;
      if (bmi < 18.5) {
        message +=
          "You may be facing issues with being underweight: Underweight";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        message += "Ideal range for good health: Normal";
      } else if (bmi >= 25 && bmi <= 29.9) {
        message += "Attention needed for weight loss: Overweight";
      } else if (bmi >= 30 && bmi <= 34.9) {
        message += "Weight loss measures required: Obese Level I";
      } else if (bmi >= 35 && bmi <= 39.9) {
        message +=
          "Support and treatment from an expert needed: Obese Level II";
      } else {
        message +=
          "Immediate medical intervention and consultation needed: Obese Level III";
      }

      await models.Users.update(
        {
          full_name,
          phone_number,
          email,
          height,
          weight,
          health_index: bmi,
          message,
          image,
        },
        { where: { user_id } }
      );
      const user = await models.Users.findOne({ where: { user_id } });
      succesCode(res, user, "Update Profile Successfully");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Backend error" });
  }
};

const getUserByID = async (req, res) => {
  try {
    const { user_id } = req.params;
    const workouts = await models.Users.findOne({
      where: { user_id },
    });

    succesCode(res, workouts, "Get User Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const history = async (req, res) => {
  try {
    const { user_id } = req.params;
    const workouts = await models.UserSelectedPlans.findAll({
      where: { user_id },
      include: [
        {
          model: models.WorkoutPlans,
          as: "plan",
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
          ],
        },
      ],
    });

    succesCode(res, workouts, "Get History User Select Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const getListUser = async (req, res) => {
  try {
    const user = await models.Users.findAll({});

    succesCode(res, user, "Get List User Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const workouts = await models.Users.update(
      { status: "banned" },
      {
        where: { user_id },
      }
    );

    succesCode(res, workouts, "Delete User Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};




const searchUserByName = async (req, res) => {
  let { full_name } = req.body;

  // // Chuẩn hóa chuỗi Unicode
  // full_name = full_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
console.log(full_name)
  try {
    const user = await models.Users.findAll({
      where: {
        full_name: {
          [Op.like]: `%${full_name}%` // Sử dụng Op.like thay vì Op.iLike
        }
      }
    });

    if (user.length === 0) {
      return failCode(res, "No user found with this name");
    }

    succesCode(res, user, "Found user by name successfully!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};
module.exports = {
  getListUser,
  createUser,
  login,
  updateUser,
  getUserByID,
  history,
  deleteUser,
  searchUserByName
};
