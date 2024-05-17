const AWS = require('aws-sdk');
const fs = require('fs'); 
require('dotenv').config();

const bucketName = process.env.BUCKET_NAME 
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const region = process.env.BUCKET_REGION
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region: region
});
  const uploadFile =  (file) => { 
    const fileContent = fs.readFileSync(file.path);
    const params = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: fileContent,
      ContentType: 'image/webp'
    };
  return new Promise((resolve, reject) => {
    s3.upload(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    }).on("httpUploadProgress", (progress) => {
      console.log(Math.round((progress.loaded / progress.total) * 100), "%");
    });
  });
};

const getImage = (key) => {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  return new Promise((resolve, reject) => {
    s3.getObject(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.Body);
      }
    });
  });
};

const deleteImage = (key) => {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve('Image deleted successfully.');
      }
    });
  });
};


module.exports = {uploadFile, deleteImage, getImage};

