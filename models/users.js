'use strict';
const bcrypt = require("bcrypt");
const createError = require('http-errors');

const {
  Model,
  DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      this.hasMany(models.expenses, { foreignKey: 'user_id' });
    }
  }
  users.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      require: true,
    },
    created_at: {
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
    modelName: 'users',
    createdAt: 'created_at',
    isDelete:false,
    timestamps: true,
    updatedAt: false
  });

  async function encryptPasswordIfChanged(user, options) {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.setDataValue('password', hash);
    }
  }

  users.beforeCreate(encryptPasswordIfChanged);
  users.beforeUpdate(encryptPasswordIfChanged);

  users.prototype.validPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      console.log(error);
      throw new createError(403, "Error comparing passwords");
    }
  };

  return users;
};