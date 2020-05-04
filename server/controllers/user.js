const User = require("../models/User");
const sharp = require("sharp")
const path = require("path");
const fs = require("fs");
const _ = require('lodash')
exports.profile = async (req, res, next) => {
    const user = await User.findById(req.params.id).select("-password -salt")
    if (!user) {
        return res.status(400).json({ error: 'User not found with this id' })
    }
    req.profile = user
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
            .toFile(path.resolve(req.file.destination, "user", image))
        fs.unlinkSync(req.file.path);
        if (profile.photo) fs.unlinkSync(`public/uploads/${profile.photo}`)
        profile.photo = "user/" + image;
    }
    // password update
    if (req.body.oldPassword && req.body.newPassword) {
        let user = await User.findByCredentials(profile.email, req.body.oldPassword)
        if (!user) {
            return res.status(400).json({
                error: "Wrong Password."
            });
        }
        profile.password = req.body.newPassword
    }
    // geolocation update
    if (req.body.lat && req.body.long) {
        let geolocation = {
            type: "Point",
            coordinates: [req.body.long, req.body.lat]
        };
        profile.geolocation = geolocation;

    }
    profile = _.extend(profile, req.body)
    console.log(profile);
    profile = await profile.save();
    profile.salt = undefined;
    profile.password = undefined;

    res.json(profile);
}