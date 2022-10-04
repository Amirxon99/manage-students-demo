const { validationResult } = require("express-validator");
const Student = require("../models/Student");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Op } = require("sequelize");
const Attachment = require("../models/Attachment");
const TempFiles = require("../models/TempFiles");

exports.getAllStudents = catchAsync(async (req, res) => {
  const { page = 1, size = 100, search } = req.query;
  console.log(search);
  const allStudents = await Student.findAndCountAll({
    attributes: ["id", "firstName", "lastName", "birthDate", "courseId"],
    offset: (page - 1) * size,
    limit: size || 100,
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
    message: "",
    error: null,
    data: {
      allStudents: { content, pagination },
    },
  });
});

exports.createStudent = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const TempFileId = req.body.attachmentId;
  const newAttachment = await TempFiles.findByPk(TempFileId);
  // console.log(newAttachment.originalName);
  const b = {
    originalName: newAttachment.originalName,
    size: newAttachment.size,
    type: newAttachment.type,
    name: newAttachment.name,
  };
  const attachment = await Attachment.create(b);
  await newAttachment.destroy();
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    courseId: req.body.courseId,
    attachmentId: attachment.id,
  };

  const newStudent = await Student.create(student);

  res.status(201).json({
    status: "success",
    message: "Created new student",
    error: null,
    data: {
      newStudent,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const studentbyId = await Student.findByPk(id);

  if (!studentbyId) {
    return next(new AppError("Bunday Id li student topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      studentbyId,
    },
  });
});

exports.updatestudent = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("validation Error ", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const studentbyId = await Student.findByPk(id);
  if (!studentbyId) {
    return next(new AppError("Bunday Id li student topilmadi"), 404);
  }
  const updateStudent = await studentbyId.update(req.body);
  res.json({
    status: "success",
    message: "Student's info edited",
    error: null,
    data: {
      updateStudent,
    },
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const studentbyId = await Student.findByPk(id);
  if (!studentbyId) {
    return next(new AppError("Bunday Id li student topilmadi", 404));
  }
  await studentbyId.destroy();
  res.status(201).json({
    status: "success",
    message: "Deleted Student",
    error: null,
    data: null,
  });
});
