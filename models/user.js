'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Loan, { foreignKey: "userId" })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Email format is invalid!" },
        notEmpty: { msg: "Email cannot be empty!" },
        notNull: { msg: "Email cannot be empty!" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: { msg: "Password cannot be empty!" },
        notNull: { msg: "Password cannot be empty!" },
        isAlphanumeric: {
          msg: "Input must be in Alphanumeric!"
        },
        isLengthValid: (value) => {
          if (value.length < 8) {
            throw new Error("Password must be at least 8 characters!")
          }
          if (value.length > 15) {
            throw new Error("Password cannot be more than 15 characters!")
          }
        },
        containUppercase: (value) => {
          let hasUppercase = false;
          for (let i = 0; i < value.length; i++) {
            const char = value[i];
            if (char >= 'A' && char <= 'Z') {
              hasUppercase = true;
              break;
            }
          }
          if (!hasUppercase) {
            throw new Error("Password must contain at least one uppercase letter!");
          }
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance) => {
        const hashedPassword = hash(instance.password)
        
        instance.password = hashedPassword
        instance.role = 'user'
      }
    }
  });
  return User;
};