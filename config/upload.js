// config/upload.js
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./s3.config");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.aws_bucket_name,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

module.exports = upload;