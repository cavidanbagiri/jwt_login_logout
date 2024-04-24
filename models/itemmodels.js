'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({CountryModels, CategoryModels, UserModels, ImageModels, ProductModels, FruitOrVegetableModels}) {
      // define association here
      this.belongsTo(CountryModels, {foreignKey: 'countryId'});
      this.belongsTo(CategoryModels, {foreignKey: 'categoryId'});
      this.belongsTo(UserModels, {foreignKey: 'userId'});
      this.hasMany(ImageModels, {foreignKey: 'itemId'});
      this.hasMany(ProductModels, {foreignKey: 'itemId'});
      this.hasMany(FruitOrVegetableModels, {foreignKey: 'itemId'});
    }
  }
  ItemModels.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'ItemModels',
    tableName: 'ItemModels',
  });
  return ItemModels;
};