const express = require("express");
const { body } = require("express-validator");
const studentController = require("../controllers/studentController");
const upload = require("../middlewares/fileUpload");
const attachmentController = require("../controllers/attachmentController");

const router = express.Router();

router
  .route("/")
  .get(studentController.getAllStudents)
  .post(
    body("firstName").notEmpty().withMessage("Ism  bo'sh bo'lishi mumkin emas"),
    body("lastName")
      .notEmpty()
      .withMessage("Familya nomi bo'sh bo'lishi mumkin emas"),
    body("birthDate")
      .notEmpty()
      .withMessage("Tug'ilgan kun bo'sh bo'lishi mumkin emas"),
    body("courseId", "Course tanlanmadi!!").notEmpty(),
    studentController.createStudent
  );
router.post(
  "/attachments",
  upload.single("avatar"),
  attachmentController.uploader
);
router
  .route("/:id")
  .get(studentController.getById)
  .put(
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("Ism  bo'sh bo'lishi mumkin emas"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Familya nomi bo'sh bo'lishi mumkin emas"),
    body("birthDate")
      .trim()
      .notEmpty()
      .withMessage("Tug'ilgan kun bo'sh bo'lishi mumkin emas"),
    body("courseId", "Course tanlanmadi!!").notEmpty(),
    studentController.updatestudent
  )
  .delete(studentController.deleteStudent);

module.exports = router;
