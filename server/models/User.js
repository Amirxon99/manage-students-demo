const { DataTypes, UUID, UUIDV4 } = require("sequelize");
const { hash } = require("bcrypt");
const Sequelize = require("../config/db");
const roles = require("../utils/constants/userRoles");

const User = Sequelize.define(
  "users",
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
        notNull: {
          msg: "FirstName kiriting!!!",
        },
        len: {
          args: [3],
          msg: "At least 4 character",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username required",
        },
        len: {
          args: [5],
          msg: "At least 5 character",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "At least 6 character",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email required",
        },
      },
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phoneNumber required",
        },
      },
    },

    verificationCode: {
      type: DataTypes.STRING,
      defaultValue: `${Math.floor(1000 + Math.random() * 9000)}`,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM(Object.values(roles)),
      allowNull: false,
      defaultValue: roles.ROLE_ADMIN,
    },
  },
  {
    underscored: true,
    hooks: {
      async beforeCreate(user) {
        user.password = await hash(user.password, 8);
      },
    },
  }
);

module.exports = User;
