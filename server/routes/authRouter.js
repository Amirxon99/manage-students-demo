const express = require("express");
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const router = express.Router();

router.post(
  "/login",
  body("username", "Login bo'sh bo'lishi mumkin emas")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Login kamida 5 ta belgidan iborat bo'lishi kerak"),
  body("password", "Parol bo'sh bo'lishi mumkin emas")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
  authController.login
);
router.post(
  "/register",
  body("firstName").notEmpty().withMessage("Ism bo'sh bo'lishi mumkin emas"),
  body("email", "Invalid Email")
    .isEmail()
    .notEmpty()
    .withMessage("Email bo'sh bo'lishi mumkin emas"),
  body("phoneNumber", "Invalid phone Number")
    .isMobilePhone()
    .notEmpty()
    .withMessage("Ism bo'sh bo'lishi mumkin emas"),
  body("username", "Login bo'sh bo'lishi mumkin emas")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Login kamida 5 ta belgidan iborat bo'lishi kerak"),
  body("password", "Parol bo'sh bo'lishi mumkin emas")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Parol kamida 6 ta belgidan iborat bo'lishi kerak"),

  authController.register
);

router.get("/verify/:id", authController.verify);
router.post("/verifyPhone/:id", authController.verifyByPhone);

module.exports = router;
