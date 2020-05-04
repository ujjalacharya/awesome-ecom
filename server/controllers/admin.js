const Admin = require("../models/Admin");
const sharp = require("sharp")
const path = require("path");
const fs = require("fs");
const _ = require('lodash')
exports.profile = async (req, res, next) => {
    const admin = await Admin.findById(req.params.id).select("-password -salt")
    if (!admin) {
        return res.status(400).json({ error: 'Admin not found with this id' })
    }
    req.profile = admin
    next();
}

// getProfile
exports.getProfile = async (req, res) => {
    res.json(req.profile)
}

// update or complete profile
exports.updateProfile = async (req, res) => {
    let profile = req.profile
    if (req.file !== undefined) {
        const { filename: image } = req.file;
        //Compress image
        await sharp(req.file.path)
        .resize(300)
        .jpeg({ quality: 100 })
        .toFile(path.resolve(req.file.destination,"admin", image))
        fs.unlinkSync(req.file.path);
        if(profile.photo) fs.unlinkSync(`public/uploads/${profile.photo}`)
        profile.photo = "admin/" + image;
    }
    // password update
    if (req.body.oldPassword && req.body.newPassword) {
        let admin = await Admin.findByCredentials(profile.email, req.body.oldPassword)
        if (!admin) {
            return res.status(400).json({
                error: "Wrong Password."
            });
        }
        profile.password = req.body.newPassword
    }
    profile = _.extend(profile,req.body)
    profile = await profile.save();
    profile.salt = undefined;
    profile.password = undefined;
    
    res.json(profile);
}