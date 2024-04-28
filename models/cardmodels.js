'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModels, ItemsModels}) {
      this.belongsTo(UserModels, {foreignKey: 'userId'});
      this.belongsTo(ItemsModels, {foreignKey: 'itemsId'});
    }
  }
  CardModels.init({
    
  }, {
    sequelize,
    modelName: 'CardModels',
    tableName: 'CardModels',
  });
  return CardModels;
};