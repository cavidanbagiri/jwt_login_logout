'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProductModels, CardModels}) {
      this.hasMany(ProductModels, {foreignKey: 'categoryId'});
      this.hasMany(CardModels, {foreignKey: 'categoryId'});
      // define association here
    }
  }
  CategoryModels.init({
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CategoryModels',
    tableName: 'CategoryModels',
  });
  return CategoryModels;
};