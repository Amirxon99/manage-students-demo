const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");

const TempFiles = Sequelize.define(
  "tempFiles",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    originalName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2],
          msg: "Orginal name kamida 2 ta belgidan iborat bo'lishi kerak ",
        },
      },
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

module.exports = TempFiles;
