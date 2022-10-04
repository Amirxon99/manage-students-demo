const express = require("express");
const errorController = require("./controllers/errorController");
const AppError = require("./utils/appError");
const authMiddleware = require("./middlewares/authMiddleware");
const cors = require("cors");
const cron = require("node-cron");
const tempClear = require("./utils/ClearTempFile");

cron.schedule("* * * * *", () => {
  tempClear();
});

const courseRouter = require("./routes/courseRouter");
const studentRouter = require("./routes/studentRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Path ${req.path} not found`, 404));
});
app.use(errorController);
module.exports = app;
