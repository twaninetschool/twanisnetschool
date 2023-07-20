const AWS  = require('aws-sdk')
require('aws-sdk/lib/maintenance_mode_message').suppress = true,
    multer = require('multer'),
    multerS3 = require('multer-s3'),
    { v4: uuid } = require('uuid');


    const s3 = new AWS.S3({
        accessKeyId: process.env.AmazonS3_Access_Key_ID,
        secretAccessKey: process.env.AmazonS3_Secret_Access_Key,
      })
      
      module.exports.uploadVideo = multer({
        storage: multerS3({
          s3: s3,
          bucket: 'twanis-net-school/videos',
          acl: 'public-read',
          metadata: function (req, file, cb) {
            const filePath = `${uuid()}-${file.originalname}`
            cb(null, { fieldName: filePath })
          },
          key: function (req, file, cb) {
            const filePath = `${uuid()}-${file.originalname}`
            cb(null, filePath)
          },
        }),
      })