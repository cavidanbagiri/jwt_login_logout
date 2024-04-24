'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ItemModels}) {
      // define association here
      this.belongsTo(ItemModels, {foreignKey: 'itemId'});
    }
  }
  ImageModels.init({
    image_url: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ImageModels',
    tableName: 'ImageModels',
  });
  return ImageModels;
};