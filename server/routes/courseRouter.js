const express = require("express");
const { body } = require("express-validator");
const courseController = require("../controllers/courseController");

const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Kurs nomi bo'sh bo'lishi mumkin emas"),
    courseController.createCourse
  );

router
  .route("/:id")
  .get(courseController.getById)
  .put(
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Kurs nomi bo'sh bo'lishi mumkin emas"),
    courseController.updateCourse
  )
  .delete(courseController.deleteCourse);

router.route("/:id/students").get(courseController.getStudentsByCourseId);

module.exports = router;
