const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");
const Student = require("./Student");

const Course = Sequelize.define(
  "courses",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Course nomini kiriting!!!",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { underscored: true }
);

Course.hasMany(Student, { as: "students" });
Student.belongsTo(Course, { as: "course", onDelete: "restrict" });

module.exports = Course;
