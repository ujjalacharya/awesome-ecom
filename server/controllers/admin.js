const Admin = require("../models/Admin");
const BusinessInfo = require("../models/BusinessInfo")
const AdminBank = require("../models/AdminBank")
const AdminWarehouse = require("../models/AdminWarehouse")
const Notification = require("../models/Notification")
const File = require('../models/AdminFiles')
// const sharp = require("sharp")
// const path = require("path");
const { fileRemover, imageCompressor } = require("../middleware/helpers");
const fs = require("fs");
const _ = require('lodash');
const Fawn = require("fawn");
const task = Fawn.Task();

exports.profile = async (req, res, next) => {
    const admin = await Admin.findById(req.params.id)
                // .select('-salt -password')
    if (!admin) {
        return res.status(404).json({ error: 'Admin not found with this id' })
    }
    req.profile = admin
    next();
}

// getProfile
exports.getProfile = async (req, res) => {
    req.profile.resetPasswordLink = undefined
    req.profile.emailVerifyLink = undefined
    req.profile.salt = undefined
    req.profile.password = undefined
    res.json(req.profile)
}

// update or complete profile
exports.updateProfile = async (req, res) => {
    let profile = req.profile
    // password update
    if (req.body.oldPassword && req.body.newPassword) {
        let admin = await Admin.findByCredentials(profile.email, req.body.oldPassword)
        if (!admin) {
            return res.status(403).json({
                error: "Wrong Password."
            });
        }
        profile.password = req.body.newPassword
    }
    
    profile.holidayMode.start = req.body.holidayStart && req.body.holidayStart
    profile.holidayMode.end = req.body.holidayEnd && req.body.holidayEnd
    profile.password = undefined//for security
    profile.salt = undefined//for security
    profile = _.extend(profile, req.body)
    profile.isVerified = null
    await profile.save();
    res.json(profile);
}

exports.uploadPhoto = async (req, res) => {
    let profile = req.profile
    if (req.file == undefined) {
        return res.status(400).json({ error: 'Image is required.' })
    }
    const { filename, path: filepath, destination } = req.file
    //Compress image
    // await sharp(req.file.path)
    //     .resize(300)
    //     .jpeg({ quality: 100 })
    //     .toFile(path.resolve(req.file.destination, "admin", filename))
    await imageCompressor(
        filename,
        300,
        filepath,
        destination,
        "admin"
    );
    fs.unlinkSync(filepath);//remove from public/uploads
    // if update then remove old photo
    if (profile.photo) fs.unlinkSync(`public/uploads/${profile.photo}`)
    profile.photo = "admin/"+ filename ;
    await profile.save()
    res.json({ photo: profile.photo })
}

exports.adminFile = async (req, res) => {
    if (req.file == undefined) {
        return res.status(400).json({ error: 'Image of adminfile is required.' })
    }
    if (req.query.filetype !== 'bank' || req.query.filetype !== 'citizenship' || req.query.filetype !== 'businessLicence') {
        return res.status(403).json({error: 'Invalid file type.'})
    }
    // const { filename: image } = req.file;
    // //Compress image
    // await sharp(req.file.path)
    // .resize(400)
    // .toFile(path.resolve(req.file.destination, req.query.filetype, image))//filetype='bank' || 'citizenship' || 'businessLicence'
    const { filename, path: filepath, destination } = req.file
    await imageCompressor(
        filename,
        400,
        filepath,
        destination,
        req.query.filetype
    );
    fs.unlinkSync(filepath);//remove from public/uploads

    const newFile = new File({ fileUri: `${req.query.filetype}/${filename}`})
    await newFile.save()
    res.json({[req.query.filetype]:newFile})
};



exports.deleteFileById = async (req, res) => {
    const filetype = req.query.filetype
    if (filetype !== 'bank' || filetype !== 'citizenshipBack' || filetype !== 'citizenshipFront' || filetype !== 'businessLicence' ) {
        return res.status(403).json({ error: "Invalid file type." })
    }
    if (filetype === 'bank') {
        let bank = await AdminBank.find(req.profile._id)
        if (!bank || bank.chequeCopy) {
            return res.status(404).json({ error: "File not found" })
        }
        let updateBank = bank.toObject()
        updateBank.chequeCopy = null
        updateBank.isVerified = null
        task.update(bank, updateBank).options({ viaSave: true })
    }
    if (filetype === 'citizenshipBack') {
        let businessinfo = await BusinessInfo.find(req.profile._id)
        if (!businessinfo || businessinfo.citizenshipBack) {
            return res.status(404).json({ error: "File not found" })
        }
        let updateBusinsessinfo = businessinfo.toObject()
        updateBusinsessinfo.citizenshipBack = null
        updateBusinsessinfo.isVerified = null
        task.update(businessinfo, updateBusinsessinfo).options({ viaSave: true })
    }
    if (filetype === 'citizenshipFront') {
        let businessinfo = await BusinessInfo.find(req.profile._id)
        if (!businessinfo || businessinfo.citizenshipFront) {
            return res.status(404).json({ error: "File not found" })
        }
        let updateBusinsessinfo = businessinfo.toObject()
        updateBusinsessinfo.citizenshipFront = null
        updateBusinsessinfo.isVerified = null
        task.update(businessinfo, updateBusinsessinfo).options({ viaSave: true })
    }
    if (filetype === 'businessLicence') {
        let businessinfo = await BusinessInfo.find(req.profile._id)
        if (!businessinfo || businessinfo.businessLicence) {
            return res.status(404).json({ error: "File not found" })
        }
        let updateBusinsessinfo = businessinfo.toObject()
        updateBusinsessinfo.businessLicence = null
        updateBusinsessinfo.isVerified = null
        task.update(businessinfo, updateBusinsessinfo).options({ viaSave: true })
    }

    // let file = await File.findByIdAndRemove(req.query.file_id);
    const updateProfile = req.profile.toObject()
    updateProfile.isVerified = null
    task.update(req.profile, updateProfile).options({ viaSave: true })
    let results = await task
        .remove(File, { _id: req.query.file_id })
        .run({ useMongoose: true });
    let Path = `public/uploads/${results[2].fileUri}`;
    fs.unlinkSync(Path);
    res.json({[filetype]:results[2]});//i.e romoved file
};

exports.getBusinessInfo = async (req, res) => {
    let businessinfo = await BusinessInfo.findOne({ admin: req.profile._id })
        .populate('businessLicence')
        .populate('citizenshipBack')
        .populate('citizenshipFront')
    if (!businessinfo) {
        return res.status(404).json({ error: "No business information." })
    }
    res.json(businessinfo)
}

exports.businessinfo = async (req, res) => {
    //make req.files to array of objs
    // let files = []
    // if (req.files) for (const file in req.files) {
    //     files.push(req.files[file][0]);
    // }
    // files.forEach(async file => {
    //     const { filename, fieldname, destination, path: filepath } = file;
    //     await sharp(filepath)
    //         .resize(400)
    //         .toFile(path.resolve(destination, fieldname === 'businessLicence' ? "businessLicence" : "citizenship", filename))//add file from uploads to doc folder
    //     fs.unlinkSync(filepath);//and remove file from public/uploads
    // })
    // req.profile.businessInfo = null
    let profile = req.profile.toObject()
    const { businessInfo } = profile
    if (businessInfo) {
        let docs = await BusinessInfo.findById(businessInfo)
        let updateDoc = docs.toObject()
        //remove old file and update with new one
        console.log(docs,'inside');
         updateDoc = _.extend(updateDoc, req.body)
        // files.forEach(file => {
        //     const { filename, fieldname } = file
        //     const filePath = `public/uploads/${docs[fieldname]}`
        //     fs.unlinkSync(filePath)//remove old file from respective folders
        //     docs[fieldname] = `${fieldname === 'businessLicence' ? "businessLicence" : "citizenship"}/${filename}`;//updating docs
        // })
        updateDoc.isVerified = null
        // docs = await docs.save()
        profile.isVerified = null
        // await profile.save()
        // return res.json(docs)
        await task
            .update(req.profile, profile)
            .options({ viaSave: true,multi:true })
            .update(docs,updateDoc)
            .options({ viaSave: true, multi: true })
            .run({ useMongoose: true })
        return res.json(updateDoc)
    }
    //if !businessInfo then create new one
    //first check if files are empty or not
    // if (files.length < 3) {
    //     files.forEach(file => {
    //         const { filename, fieldname } = file
    //         const filePath = `public/uploads/${fieldname === 'businessLicence' ? "businessLicence" : "citizenship"}/${filename}`;
    //         fs.unlinkSync(filePath)
    //     })
    //     return res.status(400).json({ error: `${3 - files.length} documents are missing` })
    // }
    let docs = new BusinessInfo()
    docs = _.extend(docs, req.body)
    // files.forEach(async file => {
    //     const { filename, fieldname } = file
    //     docs[fieldname] = `${fieldname === 'businessLicence' ? "businessLicence" : "citizenship"}/${filename}`;
    // })
    docs.admin = profile._id
    profile.businessInfo = docs._id
    // console.log(profile);
    await task
        .update(req.profile, profile)
        .options({ viaSave: true, multi: true })
        .save(docs)
        .run({ useMongoose: true })

    res.json(docs)
}


exports.getBankInfo = async (req, res) => {
    let bankinfo = await AdminBank.findOne({ admin: req.profile._id }).populate('chequeCopy')
    if (!bankinfo) {
        return res.status(404).json({ error: "No bank information." })
    }
    res.json(bankinfo)
}

exports.bankinfo = async (req, res) => {
    // if (req.file) {
    //     const { filename, destination, path: filepath } = req.file;
    //     await sharp(filepath)
    //         .resize(400)
    //         .toFile(path.resolve(destination, "bank", filename))//add file from uploads to doc folder
    //     fs.unlinkSync(filepath);//and remove file from public/uploads
    // }
    let profile = req.profile.toObject()
    const { adminBank } = profile
    if (adminBank) {
        let docs = await AdminBank.findById(adminBank)
        //remove old file and update with new one
        docs = _.extend(docs, req.body)
        // update cheque file
        // if (req.file) {
        //     const { filename } = req.file
        //     const filePath = `public/uploads/${docs["chequeCopy"]}`
        //     fs.unlinkSync(filePath)//remove old file from respective folders
        //     docs["chequeCopy"] = `bank/${filename}`;//updating docs
        // }
        docs.isVerified = null
        await docs.save()
        //db transaction gareko chaina 
        profile.isVerified = null
        // await profile.save()
        // return res.json(docs)
        docs =  await task
            .save(docs)
            .update(req.profile, profile)
            .options({ viaSave: true })
            .run({ useMongoose: true })
        return res.json({docs:docs[0]})
    }
    //first check if cheque is empty or not
    // if (!req.file) return res.status(400).json({ error: "Cheque copy is required" })

    let docs = new AdminBank()
    docs = _.extend(docs, req.body)
    // const { filename } = req.file
    // docs["chequeCopy"] = `bank/${filename}`;
    docs.admin = profile._id
    profile.adminBank = docs._id
    await task
        .save(docs)
        .update(req.profile, profile)
        .options({ viaSave: true })
        .run({ useMongoose: true })
    res.json(docs)
}

exports.getWareHouse = async (req, res) => {
    let warehouseinfo = await AdminWarehouse.findOne({ admin: req.profile._id })
    if (!warehouseinfo) {
        return res.status(404).json({ error: "No warehouse information available." })
    }
    res.json(warehouseinfo)
}

exports.warehouse = async (req, res) => {
    let profile = req.profile.toObject()
    const { adminWareHouse } = profile
    if (adminWareHouse) {
        let warehouseInfo = await AdminWarehouse.findById(adminWareHouse)
        warehouseInfo = _.extend(warehouseInfo, req.body)
        warehouseInfo.isVerified = null
        // await warehouseInfo.save()
        //db transaction gareko chaina 
        profile.isVerified = null
        // await profile.save()
        // return res.json(warehouseInfo)
        await task
            .save(docs)
            .update(req.profile, profile)
            .options({ viaSave: true })
            .run({ useMongoose: true })
        return res.json({ warehouseInfo })
    }
    let newWareHouse = new AdminWarehouse(req.body)
    newWareHouse.admin = profile._id
    profile.adminWareHouse = newWareHouse._id
    await task
        .save(newWareHouse)
        .update(req.profile, profile)
        .options({ viaSave: true })
        .run({ useMongoose: true })
    res.json(newWareHouse)
}


exports.getNotifications = async(req,res) => {
    let adminNotification = await Notification.findOne({ admin: req.admin._id })
    if (adminNotification) {
        adminNotification.noOfUnseen = 0
        // adminNotification.notifications  = _.reverse(adminNotification.notifications)
        // adminNotification.markModified('notifications')
        adminNotification =   await adminNotification.save()
        return res.json(adminNotification)
    }
    adminNotification = {
        admin: req.admin._id,
        notifications:[],
        noOFUnseen:0
    }
    res.json(adminNotification)

}

exports.readNotification = async(req,res) => {
    let adminNotification = await Notification.findOne({ admin: req.admin._id })
    if (adminNotification) {
        adminNotification.notifications = adminNotification.notifications.map(n=> {
            if (n._id.toString() === req.notification_id) {
                n.hasRead = true
            }
            return n
        })
        await adminNotification.save()
        return res.json(adminNotification)
    }
    adminNotification = {
        admin: req.admin._id,
        notifications: [],
        noOFUnseen: 0
    }
    res.json(adminNotification)
}