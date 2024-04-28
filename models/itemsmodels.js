'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemsModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({CountryModels, CategoryModels, UserModels, ImageModels, ProductModels, FruitOrVegetableModels, CardModels}) {
      this.belongsTo(CountryModels, {foreignKey: 'countryId'});
      this.belongsTo(CategoryModels, {foreignKey: 'categoryId'});
      this.belongsTo(UserModels, {foreignKey: 'userId'});
      this.hasMany(ImageModels, {foreignKey: 'itemsId'});
      this.hasMany(ProductModels, {foreignKey: 'itemsId'});
      this.hasMany(FruitOrVegetableModels, {foreignKey: 'itemsId'});
      this.hasMany(CardModels, {foreignKey: 'itemsId'});
    }
  }
  ItemsModels.init({
    name: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.DOUBLE
    },
    unit: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DOUBLE
    },
    currency: {
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'ItemsModels',
    tableName: 'ItemsModels',
  });
  return ItemsModels;
};