'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductModels extends Model {

    static associate({CategoryModels, UserModels, CountryModels, ImageModels}) {
      this.belongsTo(CategoryModels, {foreignKey: 'categoryId'});
      this.belongsTo(UserModels, {foreignKey: 'userId'});
      this.belongsTo(CountryModels, {foreignKey: 'countryId'});
      this.hasMany(ImageModels, {foreignKey: 'productId'});
      // define association here
    }
  }
  ProductModels.init({
    product_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ProductModels',
    tableName: 'ProductModels',
  });
  return ProductModels;
};