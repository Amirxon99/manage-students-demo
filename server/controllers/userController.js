const User = require("../models/User");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Op } = require("sequelize");

exports.getAllUsers = catchAsync(async (req, res) => {
  const { page = 1, size = 100 } = req.query;

  const allUsers = await User.findAndCountAll({
    where: { role: { [Op.eq]: "ADMIN" } },
    offset: (page - 1) * size,
    limit: size === 0 ? null : 10,
  });

  allUsers.totalPages = Math.ceil(allUsers.count / size) || 0;
  allUsers.isLastPages =
    page === 1 ? true : allUsers.totalPages === +page ? true : false;
  allUsers.isFirstpage = +page === 1;
  const content = allUsers.rows;
  const pagination = {
    count: allUsers.count,
    totalPages: allUsers.totalPages,
    isLastPage: allUsers.isLastPages,
    isFirstPage: allUsers.isFirstpage,
    page,
  };
  // const a = content.filter((u) => u.role !== "SUPER_ADMIN");
  // console.log(a);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allUsers: { content, pagination },
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const userById = await User.findByPk(id);

  if (!userById) {
    return next(new AppError("Bunday Id li User topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      userById,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const userById = await User.findByPk(id);
  if (!userById) {
    return next(new AppError("Bunday Id li user topilmadi", 404));
  }
  await userById.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted User",
    error: null,
    data: null,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const { id } = req.params;
  const userById = await User.findByPk(id);

  if (!userById) {
    return next(new AppError(`${id} bunday idli User mavjud emas!!`), 404);
  }
  const updatedUser = await userById.update(req.body);

  res.json({
    status: "success",
    message: "Course successfuly edited!!",
    error: null,
    data: {
      updatedUser,
    },
  });
});

exports.uploadFile = catchAsync(async (req, res, next) => {
  console.log(req.file);
  res.status(201).json({
    status: "success",
    message: "Deleted User",
    error: null,
    data: null,
  });
});
