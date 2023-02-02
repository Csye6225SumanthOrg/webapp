'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull: {
        arg:false,
        msg: 'User name cannot be empty'
      },
      unique: {
        arg: true,
        msg: 'This username is already taken.'
      },
      validate:{
        isEmail: {
          arg: true,
          msg: 'Username should be in form of email.'
        },
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: {
        arg:false,
        msg: 'Password cannot be empty'
      }
    },

    first_name: {
      type:DataTypes.STRING,
      allowNull: {
        arg:false,
        msg: 'First name cannot be empty'
      },
        isAlphanumeric: {
          arg: true,
          msg: "Enter valid first name"
      }
    },
    last_name: {
      type:DataTypes.STRING,
      allowNull: {
        arg:false,
        msg: 'Last name cannot be empty'
      },
      validate:{
        isAlphanumeric: {
          arg: true,
          msg: "Enter valid last name"
        }
      }
    }
  }, {
    sequelize,
    timestamps: true,
    instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
    },
    updatedAt: 'account_updated',  
    createdAt: 'account_created',
    modelName: 'User',
  });
  return User;
};