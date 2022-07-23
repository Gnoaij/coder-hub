const path = require('path')
// const fs = require('fs')

const Router = require('@koa/router')
const multer = require('@koa/multer')

// const upload = multer({ dest: './uploads/' })

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dest = './uploads/'
//     if (!fs.existsSync(dest)) {
//       fs.mkdirSync(dest)
//     }
//     cb(null, dest)
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const { tokenVerify } = require('../../middleware')
const uploadController = require('../../controller/upload')

const uploadRouter = new Router({ prefix: '/upload' })

uploadRouter.post(
  '/',
  tokenVerify(),
  upload.single('fileKey'),
  uploadController.save
)

module.exports = uploadRouter
