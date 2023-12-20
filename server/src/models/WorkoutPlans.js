const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return WorkoutPlans.init(sequelize, DataTypes);
}

class WorkoutPlans extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    plan_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    goal: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fitness_level: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'Category',
        key: 'category_id'
      }
    },
    plan_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'WorkoutPlans',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "plan_id" },
        ]
      },
      {
        name: "category_id",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  }
}
