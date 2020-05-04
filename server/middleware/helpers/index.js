module.exports = {
    errorHandler: require("./dbErrorHandler").errorHandler,
    uploadAdminPhoto: require("./multer").uploadAdminPhoto,
    uploadUserPhoto: require("./multer").uploadUserPhoto,
    sendEmail: require("./mailer").sendEmail,
    dbConnection: require("./dbConnection"),
}