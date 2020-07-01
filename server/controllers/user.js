const User = require("../models/User");
const Address = require("../models/Address")
const sharp = require("sharp")
const path = require("path");
const fs = require("fs");
const _ = require('lodash')
const Fawn = require('fawn')
const task = Fawn.Task()

exports.profile = async (req, res, next) => {
    const user = await User.findById(req.params.id)
        .select("-password -salt -resetPasswordLink -emailVerifyLink")
    .populate('location')
    if (!user) {
        return res.status(404).json({ error: 'User not found with this id' })
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
    let profile = req.user
    // password update
    if (req.body.oldPassword && req.body.newPassword) {
        let user = await User.findByCredentials(profile.email, req.body.oldPassword)
        if (!user) {
            return res.status(403).json({
                error: "Wrong Password."
            });
        }
        profile.password = req.body.newPassword
    }
    profile = _.extend(profile, req.body)
    profile = await profile.save();
    profile.salt = undefined;
    profile.password = undefined;
    profile.resetPasswordLink = undefined;
    profile.emailVerifyLink = undefined;

    res.json(profile);
}

exports.uploadPhoto = async (req, res) => {
    let profile = req.user
    if (req.file == undefined) {
        return res.status(400).json({error:'Image is required.'})
    }
    const { filename: image } = req.file;
    //Compress image
    await sharp(req.file.path)
        .resize(300)
        .jpeg({ quality: 100 })
        .toFile(path.resolve(req.file.destination, "user", image))
    fs.unlinkSync(req.file.path);//remove from public/uploads
    // if update then remove old photo
    if (profile.photo) fs.unlinkSync(`public/uploads/${profile.photo}`)
    profile.photo = "user/" + image;
    await profile.save()
    res.json({ photo: profile.photo })
}

exports.addAddress = async(req,res) => {
    let profile = req.user
    //if there are already home and office addresses
    if (profile.location.length===2) {
        return res.status(403).json({error: "Cannot add more address."})
    }
    //if there is one address, make sure newAddress is not of the same address label
    if (profile.location.length === 1) {
        let address = await Address.findById(profile.location[0])
        if (address.label=== req.body.label) {
            return res.status(403).json({error:`There is already address of label ${address.label}`})
        }
    }
    let newAddress = new Address(req.body)
    //if newAddress is the first address, then it should be active
    if (profile.location.length === 0 ) {
        newAddress.isActive = Date.now()
    }
    // geolocation
    if (req.body.lat && req.body.long) {
        let geolocation = {
            type: "Point",
            coordinates: [req.body.long, req.body.lat]
        };
        newAddress.geolocation = geolocation;
    }
    newAddress.user = profile._id
    let user = await User.findById(profile._id)
    updateuser = user.toObject()
    updateuser.location.push(newAddress._id)
    const results = await task
        .save(newAddress)
        .update(user, updateuser)
        .options({ viaSave: true })
        .run({ useMongoose: true })

    res.json(results)
}