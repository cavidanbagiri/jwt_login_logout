'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({TokenModels, ProductModels, CardModels}) {
      this.hasOne(TokenModels, {foreignKey: 'user_id'});
      this.hasMany(ProductModels, {foreignKey: 'userId'});
      this.hasMany(CardModels, {foreignKey: 'userId'});
      // define association here
    }
  }
  UserModels.init({
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserModels',
    tableName: 'UserModels',
  });
  return UserModels;
};