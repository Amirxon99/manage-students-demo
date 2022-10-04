const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();
router.route("/").get(userController.getAllUsers);
router.route("/:id").put(userController.updateUser);

router
  .route("/:id")
  .get(userController.getById)
  .delete(userController.deleteUser);

module.exports = router;
