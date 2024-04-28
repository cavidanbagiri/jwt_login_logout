'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductModels extends Model {

    static associate({ItemsModels}) {
      this.belongsTo(ItemsModels, {foreignKey: 'itemsId'});
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