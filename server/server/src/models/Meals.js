const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Meals.init(sequelize, DataTypes);
}

class Meals extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    meal_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    meal_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Meals',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "meal_id" },
        ]
      },
    ]
  });
  }
}
