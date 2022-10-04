const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Course = require("../models/Course");
const Student = require("../models/Student");
const { Op } = require("sequelize");
const QueryBuilder = require("../utils/QueryBuilder");

exports.getAllCourses = catchAsync(async (req, res) => {
  // const { page = 1, size = 100, search } = req.query;

  // const allCourses = await Course.findAndCountAll({
  //   attributes: ["id", "name", "description"],
  //   offset: (page - 1) * size || 0,
  //   limit: size || 10,
  //   where: search && {
  //     [Op.or]: [
  //       { name: { [Op.iLike]: `%${search}%` } },
  //       { description: { [Op.iLike]: `%${search}%` } },
  //     ],
  //   },
  // });
  // allCourses.totalPages = Math.ceil(allCourses.count / size) || 0;
  // allCourses.isLastPages =
  //   page === 1 ? true : allCourses.totalPages === +page ? true : false;
  // allCourses.isFirstpage = +page === 1;
  // const content = allCourses.rows;
  // const pagination = {
  //   count: allCourses.count,
  //   totalPages: allCourses.totalPages,
  //   isLastPage: allCourses.isLastPages,
  //   isFirstPage: allCourses.isFirstpage,
  //   page,
  // };

  const queryBuilder = new QueryBuilder(req.query);

  queryBuilder
    .filter()
    .paginate()
    .limitFields()
    .search(["name", "description"])
    .sort();

  let allCourses = await Course.findAndCountAll(queryBuilder.queryOptions);
  allCourses = queryBuilder.createPage(allCourses);

  res.json({
    status: "success",
    message: "salom",
    error: null,
    data: {
      allCourses,
    },
  });
});

exports.createCourse = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const newCourse = await Course.create(req.body);
  res.status(201).json({
    status: "success",
    message: "New course successfully created!!",
    error: null,
    data: {
      newCourse,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const courseById = await Course.findByPk(id);

  if (!courseById) {
    return next(new AppError(`${id} bunday idli course mavjud emas!!`), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      courseById,
    },
  });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const { id } = req.params;
  const courseById = await Course.findByPk(id);

  if (!courseById) {
    return next(new AppError(`${id} bunday idli course mavjud emas!!`), 404);
  }
  const updatedCourse = await courseById.update(req.body);

  res.json({
    status: "success",
    message: "Course successfuly edited!!",
    error: null,
    data: {
      updatedCourse,
    },
  });
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedCourse = await Course.findByPk(id);

  if (!updatedCourse) {
    return next(new AppError(`${id} bunday idli course mavjud emas!!`), 404);
  }
  await updatedCourse.destroy();
  res.status(201).json({
    status: "success",
    message: "Course successfully deleted",
    error: null,
    data: null,
  });
});

exports.getStudentsByCourseId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { page, size, search } = req.query;
  const course = await Course.findByPk(id);
  const allStudents = await Student.findAndCountAll({
    where: { courseId: { [Op.eq]: id } },
    attributes: ["firstName", "lastName", "birthDate"],
    offset: (page - 1) * size || 0,
    limit: size === 0 ? null : 10,
    where: search && {
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
      ],
    },
  });
  allStudents.totalPages = Math.ceil(allStudents.count / size) || 0;
  allStudents.isLastPages =
    page === 1 ? true : allStudents.totalPages === +page ? true : false;
  allStudents.isFirstpage = +page === 1;
  const content = allStudents.rows;
  const pagination = {
    count: allStudents.count,
    totalPages: allStudents.totalPages,
    isLastPage: allStudents.isLastPages,
    isFirstPage: allStudents.isFirstpage,
    page,
  };

  res.json({
    status: "success",
    message: `Students of ${course.name} course`,
    error: null,
    data: {
      allStudents: { content, pagination },
      course: course.name,
    },
  });
});
