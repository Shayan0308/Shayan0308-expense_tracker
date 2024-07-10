'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expenses2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  expenses2.init({
    id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'expenses2',
  });
  return expenses2;
};