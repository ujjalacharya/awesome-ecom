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
    //if there are already home,office and ship-to addresses
    if (profile.location.length===3) {
        return res.status(403).json({error: "Cannot add more address."})
    }
    //if there is already same label of address of the user then do not create new Address.
    let addresses = profile.location
    if (addresses.some(a => a.label === req.body.label)) {
        return res.status(403).json({ error: `There is already address of label ${req.body.label}` })
    }
    let newAddress = new Address(req.body)
    //if newAddress is the first address and label is not ship-to, then it should be active
    if (!profile.location.length && newAddress.label!=='ship-to') {
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
        .update(user, updateuser)
        .options({ viaSave: true })
        .save(newAddress)
        .run({ useMongoose: true })

    res.json(results[1])
}

exports.editAddress = async(req,res) => {
    if (!req.user.location.includes(req.params.address_id)) {
        return res.status(403).json({error:"Cannot update address."})
    }
    let address = await Address.findById(req.params.address_id)
    if (!address) {
        return res.status(404).json({error:"Address not found."})
    }
    //user cannot edit label and activeness
    if(req.body.label) req.body.label=undefined
    if(req.body.isActive) req.body.isActive = undefined
    address = _.extend(address,req.body)
    address = await address.save()
    res.json(address)
}

exports.toggleAddressActiveness = async(req,res) => {
    let addresses = await Address.find({user:req.user._id ,label:{$ne:'ship-to'}})
    if (!addresses.length) {
        return res.json(addresses)
    }
    //if there is single address make it isActive
    if (addresses.length === 1) {
        addresses[0].isActive = Date.now()
        await addresses[0].save()
        return res.json(addresses)
    }
    // else there are 2 addresses so toggle isActive
    let add1 = addresses[0].toObject()
    let add2 = addresses[1].toObject()
    if (add1.isActive === null) {
        add1.isActive = Date.now()
        add2.isActive = null
        const results = await task
            .update(addresses[0], add1)
            .options({ viaSave: true })
            .update(addresses[1], add2)
            .options({ viaSave: true })
            .run({ useMongoose: true })

        return res.json(results)
    }
    if (add2.isActive === null) {
        add2.isActive = Date.now()
        add1.isActive = null
        const results = await task
            .update(addresses[0], add1)
            .options({ viaSave: true })
            .update(addresses[1], add2)
            .options({ viaSave: true })
            .run({ useMongoose: true })

        return res.json(results)
    }
    
}