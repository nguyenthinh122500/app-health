const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return DailyPlanDetails.init(sequelize, DataTypes);
}

class DailyPlanDetails extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    detail_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    plan_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'WorkoutPlans',
        key: 'plan_id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    exercise_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'Exercises',
        key: 'exercise_id'
      }
    },
    meal_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'Meals',
        key: 'meal_id'
      }
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DailyPlanDetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "detail_id" },
        ]
      },
      {
        name: "plan_id",
        using: "BTREE",
        fields: [
          { name: "plan_id" },
        ]
      },
      {
        name: "exercise_id",
        using: "BTREE",
        fields: [
          { name: "exercise_id" },
        ]
      },
      {
        name: "meal_id",
        using: "BTREE",
        fields: [
          { name: "meal_id" },
        ]
      },
    ]
  });
  }
}
