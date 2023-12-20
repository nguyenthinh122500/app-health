const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return PlanExercises.init(sequelize, DataTypes);
}

class PlanExercises extends Sequelize.Model {
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
    exercise_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'Exercises',
        key: 'exercise_id'
      }
    }
  }, {
    sequelize,
    tableName: 'PlanExercises',
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
        name: "exercise_id",
        using: "BTREE",
        fields: [
          { name: "exercise_id" },
        ]
      },
    ]
  });
  }
}
