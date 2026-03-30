const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.aws_region,
  credentials: {
    accessKeyId: process.env.aws_access_key,
    secretAccessKey: process.env.aws_secret_access_key,
  },
});

module.exports = s3;