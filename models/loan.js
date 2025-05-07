'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Loan.belongsTo(models.Book, { foreignKey: "bookId" })
      Loan.belongsTo(models.User, { foreignKey: "userId" })
    }
  }
  Loan.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    borrowedAt: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    returnedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};