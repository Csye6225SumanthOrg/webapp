'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Image.init({
    image_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    product_id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },  
    file_name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    s3_bucket_path: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
    createdAt: 'date_created'
  });
  return Image;
};