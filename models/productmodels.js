'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductModels extends Model {

    static associate({ItemModels}) {
      this.belongsTo(ItemModels, {foreignKey: 'itemId'});
      // define association here
    }
  }
  ProductModels.init({
    
  }, {
    sequelize,
    modelName: 'ProductModels',
    tableName: 'ProductModels',
  });
  return ProductModels;
};