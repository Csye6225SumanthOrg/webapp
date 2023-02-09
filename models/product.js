'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: { 
      type:DataTypes.STRING,
      allowNull: false
    },
    description: { 
      type:DataTypes.STRING,
      allowNull: false
    },
    sku: { 
      type:DataTypes.STRING,
      allowNull: false,
      unique:{
        arg: true,
        msg:"There already a product which exits with same sku"
      }
    },
    manufacturer: { 
      type:DataTypes.STRING,
      allowNull: false
    },
    quantity:{ 
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        max:{
          args:[100],
          msg:"Quantity cannot be greater than 100"
        },
        min:{
          args:[0],
          msg:"Quantity cannot be less than 0"
        },
        isInt: {
          msg:"Quantity has to be whole number"
        }
      }

    },

    owner_user_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: true,
    updatedAt: 'date_last_updated',  
    createdAt: 'date_added',
    logging: false
  });
  return Product;
};