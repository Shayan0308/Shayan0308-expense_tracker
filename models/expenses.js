'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expenses extends Model {
    static associate(models) {
      this.belongsTo(models.users,{ foreignKey:'user_id' });
    }
  }
  expenses.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users', // name of the target model
        key: 'id' // key in the target model that the foreign key references
      }
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
    isDelete:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'expenses',
  });
  return expenses;
};