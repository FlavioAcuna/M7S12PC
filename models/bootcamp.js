"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bootcamp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bootcamp.belongsToMany(models.User, {
        through: "user_bootcamp",
        foreignKey: "bootcamp_id",
        otherKey: "user_id",
        as: "users",
      });
    }
  }
  Bootcamp.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El título del Bootcamp es obligatorio",
          },
        },
      },
      cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "El CUE debe ser un número entero",
          },
          min: {
            args: [5],
            msg: "El CUE debe ser al menos 5",
          },
          max: {
            args: [20],
            msg: "El CUE no puede ser mayor a 10",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La descripción del Bootcamp es obligatoria",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Bootcamp",
      tableName: "bootcamps",
    }
  );
  return Bootcamp;
};
