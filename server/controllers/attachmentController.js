const catchAsync = require("../utils/catchAsync");
const TempFiles = require("../models/TempFiles");

exports.uploader = catchAsync(async (req, res) => {
  const file = {
    name: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.encoding,
    type: req.file.mimetype,
  };
  const avatar = await TempFiles.create(file);
  res.json({
    status: "success",
    message: "Rasm saqlandi",
    error: null,
    data: {
      avatar,
    },
  });
});
