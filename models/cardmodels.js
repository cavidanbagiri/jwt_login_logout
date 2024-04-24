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
    static associate({UserModels, CategoryModels}) {
      this.belongsTo(UserModels, {foreignKey: 'userId'});
      this.belongsTo(CategoryModels, {foreignKey: 'categoryId'});
    }
  }
  CardModels.init({
    userId: {
      type:DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'CardModels',
    tableName: 'CardModels',
  });
  return CardModels;
};