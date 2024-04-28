'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FruitOrVegetableModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ItemsModels}) {
      // define association here
      this.belongsTo(ItemsModels, {foreignKey: 'itemsId'});
    }
  }
  FruitOrVegetableModels.init({
    kind: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'FruitOrVegetableModels',
    tableName: 'FruitOrVegetableModels',
  });
  return FruitOrVegetableModels;
};