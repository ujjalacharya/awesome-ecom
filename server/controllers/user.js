const User = require("../models/User");
const Address = require("../models/Address")
// const sharp = require("sharp")
// const path = require("path");
const { fileRemover, imageCompressor } = require("../middleware/helpers");
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
    // const { filename: image } = req.file;
    //Compress image
    // await sharp(req.file.path)
    //     .resize(300)
    //     .jpeg({ quality: 100 })
    //     .toFile(path.resolve(req.file.destination, "user", image))
    // fs.unlinkSync(req.file.path);//remove from public/uploads
    // let users = await User.find()
    // users = users.map(async (u,index)=> {
    //     let val = index + 1
    //     u.photo = "user/"+ val + ".jpg"
    //     await u.save()
    //     return u.photo
    // })
    // users = await Promise.all(users)
    // return res.json(users)

    let profile = req.user
    if (req.file == undefined) {
        return res.status(400).json({error:'Image is required.'})
    }
    //Compress image
    // const { filename: image } = req.file;
    // await sharp(req.file.path)
    //     .resize(300)
    //     .jpeg({ quality: 100 })
    //     .toFile(path.resolve(req.file.destination, "user", image))

    const { filename, path: filepath, destination } = req.file
    await imageCompressor(
        filename,
        300,
        filepath,
        destination,
        "user"
    );
    fs.unlinkSync(filepath);//remove from public/uploads
    // if update then remove old photo

    if (profile.photo ) fs.unlinkSync(`public/uploads/${profile.photo}`)
    profile.photo = "user/" + filename;
    await profile.save()
    res.json({ photo: profile.photo, socialPhoto: profile.socialPhoto })
}

exports.addAddress = async(req,res) => {
    let profile = req.user
    //if there are already home,office and ship-to addresses
    if (!req.body.label) {
        return res.status(403).json({error:'Address label undefined.'})
    }
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
    if (req.body.lat && req.body.long) {
        let geolocation = {
            type: "Point",
            coordinates: [req.body.long, req.body.lat]
        };
        address.geolocation = geolocation;
    }
    address = await address.save()
    res.json(address)
}

exports.toggleAddressActiveness = async(req,res) => {
    let activeAddress = await Address.findOne({user:req.user._id,isActive:{$ne:null}})
    if (!activeAddress) {
        return res.status(404).json({error:'Current active address not found.'})
    }
    if (activeAddress.label == req.query.label) {
        return res.json({address:activeAddress})
    }
    let tobeActiveAddress = await Address.findOne({ user: req.user._id, label:req.query.label})
    if (!tobeActiveAddress) {
        return res.status(404).json({ error: `Address labelled ${req.query.label} not found.` })
    }
    let updateActiveAddress = activeAddress.toObject()
    let updateToBeActiveAddress = tobeActiveAddress.toObject()
    updateActiveAddress.isActive = null
    updateToBeActiveAddress.isActive = Date.now()
    const results = await task
        .update(tobeActiveAddress, updateToBeActiveAddress)
        .options({ viaSave: true })
        .update(activeAddress,updateActiveAddress)
        .options({ viaSave: true })
        .run({ useMongoose: true });
    res.json({ address: results[0] })

}