const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Exercises.init(sequelize, DataTypes);
}

class Exercises extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    exercise_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    exercise_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    video_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Exercises',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "exercise_id" },
        ]
      },
    ]
  });
  }
}
