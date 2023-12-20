const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return UserSelectedPlans.init(sequelize, DataTypes);
}

class UserSelectedPlans extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    selection_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    plan_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'WorkoutPlans',
        key: 'plan_id'
      }
    },
    workout_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'UserSelectedPlans',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "selection_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "plan_id",
        using: "BTREE",
        fields: [
          { name: "plan_id" },
        ]
      },
    ]
  });
  }
}
