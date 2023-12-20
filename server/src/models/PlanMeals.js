const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return PlanMeals.init(sequelize, DataTypes);
}

class PlanMeals extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
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
    meal_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'Meals',
        key: 'meal_id'
      }
    }
  }, {
    sequelize,
    tableName: 'PlanMeals',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
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
