const catchAsync = require("../utils/catchAsync");
const { Op } = require("sequelize");
const jsonWebToken = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");
const User = require("../models/User");
const { compare } = require("bcrypt");
// const { sendVerificationMail } = require("../utils/mailUtils");
const { sendVerificationSMS } = require("../utils/smsUtil");

const generateToken = (payload, jwtSecret, options) => {
  return new Promise((resolve, rejected) => {
    jsonWebToken.sign(payload, jwtSecret, options, (err, token) => {
      if (err) {
        rejected(err);
      } else {
        resolve(token);
      }
    });
  });
};

const findByUsername = async (username) => {
  const user = await User.findOne({
    where: { username: { [Op.eq]: username } },
  });
  if (user) {
    return user;
  }
  return null;
};

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email: { [Op.eq]: email } } });
  if (user) {
    return user;
  }
  return null;
};

exports.register = catchAsync(async (req, res, next) => {
  const SuperAdmin = {
    firstName: "Amirxon",
    lastName: "Ibaydillayev",
    username: "myusername",
    password: "12345678",
    email: "abcd123@gmail.com",
    phoneNumber: "+998999999999",
    verificationCode: null,
    isVerified: true,
    role: "SUPER_ADMIN",
  };
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation Error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const sAdmin = await User.findAll({
    where: { role: { [Op.eq]: "SUPER_ADMIN" } },
  });
  if (sAdmin.length === 0) {
    const userSAdmin = await User.create(SuperAdmin);
  }
  const existedUser = await findByUsername(req.body.username);

  const exEmail = await findByEmail(req.body.email);
  if (existedUser) {
    return next(new AppError("Bunday loginli  foydalanuvchi mavjud", 409));
  }
  if (exEmail) {
    return next(new AppError("Bunday  emailli  foydalanuvchi mavjud", 409));
  }

  if (req.body.role === "SUPER_ADMIN") {
    return next(new AppError("Already have Super Admin", 409));
  }
  const newUser = await User.create(req.body);
  sendVerificationSMS({
    to: req.body.phoneNumber,
    vercode: newUser.verificationCode,
  });
  const payload = {
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    role: newUser.role,
  };

  const token = await generateToken(payload, process.env.JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: "24h",
  });

  res.status(201).json({
    status: "success",
    message: `${newUser.phoneNumber} nomeriga tasdiqlash kodini jo'natdik!`,
    error: null,
    data: {
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
      jwt: token,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation Error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const { username, password } = req.body;
  const candidate = await findByUsername(username);

  if (!candidate) {
    return next(new AppError("Login yoki Paroll hato kiritikdi!!", 400));
  }
  if (!candidate.isVerified) {
    return next(new AppError("Verifikatsiyadan o'tmagansiz", 400));
  }
  const passwordIsMatch = await compare(password, candidate.password);

  if (!passwordIsMatch) {
    return next(new AppError("Login yoki Paroll hato kiritikdi!!", 400));
  }

  const payload = {
    id: candidate.id,
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    role: candidate.role,
  };
  const token = await generateToken(payload, process.env.JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: "24h",
  });

  res.json({
    status: "success",
    data: {
      user: {
        ...payload,
      },
      jwt: token,
    },
  });
});

exports.verify = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userByVerId = await User.findOne({
    where: { verificationCode: { [Op.eq]: id } },
  });
  if (!userByVerId) {
    return next(new AppError(`Verify Error`), 404);
  }
  await userByVerId.update({ isVerified: true });
  res.json({
    status: "success",
    message: "Registration success",
    error: null,
    data: {},
  });
});

exports.verifyByPhone = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { verCode } = req.body;
  const user = await User.findByPk(id);
  if (!user) {
    return next(new AppError(`Verify Error`), 404);
  }
  const userByVerId = await User.findOne({
    where: { verificationCode: { [Op.eq]: verCode } },
  });
  if (!userByVerId) {
    return next(new AppError(`Verify Error`), 404);
  }
  await userByVerId.update({ isVerified: true });
  res.json({
    status: "success",
    message: "Registration success, Please Login In",
    error: null,
    data: {},
  });
});
