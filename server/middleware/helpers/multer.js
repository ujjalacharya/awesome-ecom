const path = require("path");
const multer = require("multer");

const storage =  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + req.admin._id + '-' + Date.now() + path.extname(file.originalname))
    }
  })

const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return callback(new Error('Not Image'))
  }
  callback(null, true)
}
const limits = { fileSize: 1024 * 1024 }

exports.uploadAdminDoc = multer({ storage, fileFilter, limits }).fields([
  { name: "citizenshipFront", maxCount: 1 },
  { name: "citizenshipBack", maxCount: 1 },
  { name: "businessLicence", maxCount: 1 }
]);
exports.uploadCheque = multer({ storage,fileFilter,limits }).single("chequeCopy");
exports.uploadAdminPhoto = multer({ storage, fileFilter, limits }).single("photo");
exports.uploadUserPhoto = multer({ storage, fileFilter, limits }).single("photo");