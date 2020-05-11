const path = require("path");
const multer = require("multer");

const storageMechanism = () => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + req.admin._id + '-' + Date.now() + path.extname(file.originalname))
    }
  })
}
exports.uploadAdminDoc = multer({ storage: storageMechanism() }).fields([
  { name: "citizenshipFront", maxCount: 1 },
  { name: "citizenshipBack", maxCount: 1 },
  { name: "businessLicence", maxCount: 1 }
]);
exports.uploadCheque = multer({ storage: storageMechanism() }).single("chequeCopy");
exports.uploadAdminPhoto = multer({ storage: storageMechanism() }).single("photo");
exports.uploadUserPhoto = multer({ storage: storageMechanism() }).single("photo");