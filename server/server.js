require("dotenv").config();
const db = require("./config/db");
const app = require("./app");

require("./models/Course");
require("./models/Student");
require("./models/User");
require("./models/Attachment");
require("./models/TempFiles");

const PORT = process.env.PORT || 5678;

db.authenticate()
  .then(() => {
    console.log("DATABASE connected successfuly");
    db.sync();
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`server started on ${PORT} port`);
});
