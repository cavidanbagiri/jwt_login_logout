'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TokenModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModels}) {
      this.belongsTo(UserModels, {foreignKey: 'user_id'});
      // define association here
    }
  }
  TokenModels.init({
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TokenModels',
    tableName: 'TokenModels',
  });
  return TokenModels;
};