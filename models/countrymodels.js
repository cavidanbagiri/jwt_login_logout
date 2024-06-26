'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CountryModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ItemsModels}) {
      // define association here
      this.hasMany(ItemsModels, {foreignKey: 'userId'});
    }
  }
  CountryModels.init({
    country_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'CountryModels',
    modelName: 'CountryModels',
  });
  return CountryModels;
};