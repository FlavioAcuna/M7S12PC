'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_bootcamp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
    }
  }
  user_bootcamp.init({
    user_id: DataTypes.INTEGER,
    bootcamp_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_bootcamp',
  });
  return user_bootcamp;
};