const { Op } = require("sequelize");
const TempFiles = require("../models/TempFiles");
const fs = require("fs");
const catchAsync = require("./catchAsync");

async function tempClear() {
  const temporaryFiles = [];
  const a = await TempFiles.findAll({
    where: { createdAt: { [Op.lt]: Date.now() - 180000 } },
  });
  for (let i = 0; i < a.length; i++) {
    temporaryFiles.push(a[i].name);
  }
  console.log(temporaryFiles);
  if (temporaryFiles.length === 0) {
    return;
  } else {
    for (let i = 0; i < temporaryFiles.length; i++) {
      try {
        fs.unlink(`static/uploads/${temporaryFiles[i]}`, (err) => {
          if (err) {
            console.log(err);
          }
          console.log("File is deleted.");
          TempFiles.destroy({
            where: { name: { [Op.eq]: temporaryFiles[i] } },
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = tempClear;
