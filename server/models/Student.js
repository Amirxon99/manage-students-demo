const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");
const Attachment = require("./Attachment");

const Student = Sequelize.define(
  "students",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4],
          msg: " Ism kamida 4 ta belgidan iborat bo'lishi kerak !! ",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4],
          msg: " Familya kamida 4 ta belgidan iborat bo'lishi kerak !! ",
        },
      },
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isAfter: "1930-01-01",
        isBefore: "2022-01-01",
      },
    },
  },
  { underscored: true }
);
Attachment.hasOne(Student, { foreignKey: "attachmentId" });
Student.belongsTo(Attachment, { as: "attachment", onDelete: "restrict" });
module.exports = Student;
