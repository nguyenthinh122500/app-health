const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Category.init(sequelize, DataTypes);
}

class Category extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    category_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  }
}
