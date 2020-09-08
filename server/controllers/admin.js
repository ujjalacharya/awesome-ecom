const Admin = require("../models/Admin");
const BusinessInfo = require("../models/BusinessInfo")
const AdminBank = require("../models/AdminBank")
const AdminWarehouse = require("../models/AdminWarehouse")
const File = require('../models/AdminFiles')
const sharp = require("sharp")
const path = require("path");
const fs = require("fs");
const _ = require('lodash');
const Fawn = require("fawn");
const task = Fawn.Task();

exports.profile = async (req, res, next) => {
    const admin = await Admin.findById(req.params.id).select("-password -salt")
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
    
    profile = _.extend(profile, req.body)
    profile.isVerified = null
    await profile.save();
    profile.password = undefined
    profile.salt = undefined
    res.json(profile);
}

exports.uploadPhoto = async (req, res) => {
    let profile = req.profile
    if (req.file == undefined) {
        return res.status(400).json({ error: 'Image is required.' })
    }
    const { filename: image } = req.file;
    //Compress image
    await sharp(req.file.path)
        .resize(300)
        .jpeg({ quality: 100 })
        .toFile(path.resolve(req.file.destination, "admin", image))
    fs.unlinkSync(req.file.path);//remove from public/uploads
    // if update then remove old photo
    if (profile.photo) fs.unlinkSync(`public/uploads/${profile.photo}`)
    profile.photo = "admin/" + image;
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
    const { filename: image } = req.file;
    //Compress image
    await sharp(req.file.path)
        .resize(400)
        .toFile(path.resolve(req.file.destination, req.query.filetype, image))//filetype='bank' || 'citizenship' || 'businessLicence'
    fs.unlinkSync(req.file.path);//remove from public/uploads

    const newFile = new File({ fileUri: `${req.query.filetype}/${image}`})
    await newFile.save()
    res.json(newFile)
};

exports.deleteFile = async (req, res) => {
    let product = req.product;
    if (product.isVerified) {
        return res
            .status(403)
            .json({
                error: "Cannot delete image. Product has already been verified.",
            });
    }
    let updateProduct = product.toObject();
    let imageFound;
    updateProduct.images = product.images.filter((image) => {
        if (image._id.toString() === req.query.image_id) imageFound = image;
        return image._id.toString() !== req.query.image_id;
    });
    if (!imageFound) {
        return res.status(404).json({ error: "Image not found" });
    }
    await task
        .update(product, updateProduct)
        .options({ viaSave: true })
        .remove(ProductImages, { _id: req.query.image_id })
        .run({ useMongoose: true });

    let Path = `public/uploads/${imageFound.thumbnail}`;
    fs.unlinkSync(Path);
    res.json(updateProduct.images);

    
};

const run = async() => {
    let banks = await AdminBank.find()
    let businessinfos = await BusinessInfo.find()
    let Banks = banks.map(async b => {
        let file = await File.findById(b.chequeCopy)
        file.admin = b.admin
        return await file.save()
    })
    let bl = businessinfos.map(async b => {
        let file = await File.findById(b.businessLicence)
        file.admin = b.admin
        return await file.save()
    })
    let cfronts = businessinfos.map(async b => {
        let file = await File.findById(b.citizenshipFront)
        file.admin = b.admin
        return await file.save()
    })
    let cbacks = businessinfos.map(async b => {
        let file = await File.findById(b.citizenshipBack)
        file.admin = b.admin
        return await file.save()
    })
    let re = await Promise.all([
        Promise.all(Banks),
        Promise.all(bl),
        Promise.all(cfronts),
        Promise.all(cbacks)
    ])
    console.log(re);
}
// run()
exports.deleteFileById = async (req, res) => {
    let _file = req.query.filetype === 'bank'
        ? AdminBank.find(req.profile._id) : (req.query.filetype === 'businessLicence' || req.query.filetype === 'citizenship')
        ? BusinessInfo.find(req.profile._id) : null
    let file = await File.findByIdAndRemove(req.query.file_id);
    let Path = `public/uploads/${file.fileUri}`;
    fs.unlinkSync(Path);
    res.json(file);
};

exports.getBusinessInfo = async (req, res) => {
    let businessinfo = await BusinessInfo.findOne({ admin: req.profile._id })
    if (!businessinfo) {
        return res.status(404).json({ error: "No business information." })
    }
    res.json(businessinfo)
}

exports.businessinfo = async (req, res) => {
    //make req.files to array of objs
    let files = []
    if (req.files) for (const file in req.files) {
        files.push(req.files[file][0]);
    }
    files.forEach(async file => {
        const { filename, fieldname, destination, path: filepath } = file;
        await sharp(filepath)
            .resize(400)
            .toFile(path.resolve(destination, fieldname === 'businessLicence' ? "businessLicence" : "citizenship", filename))//add file from uploads to doc folder
        fs.unlinkSync(filepath);//and remove file from public/uploads
    })
    let profile = req.profile.toObject()
    const { businessInfo } = profile
    if (businessInfo) {
        let docs = await BusinessInfo.findById(businessInfo)
        //remove old file and update with new one
        docs = _.extend(docs, req.body)
        files.forEach(file => {
            const { filename, fieldname } = file
            const filePath = `public/uploads/${docs[fieldname]}`
            fs.unlinkSync(filePath)//remove old file from respective folders
            docs[fieldname] = `${fieldname === 'businessLicence' ? "businessLicence" : "citizenship"}/${filename}`;//updating docs
        })
        docs.isVerified = null
        docs = await docs.save()
        //db transaction gareko chaina 
        profile.isVerified = null
        await profile.save()
        return res.json(docs)
    }
    //if !businessInfo then create new one
    //first check if files are empty or not
    if (files.length < 3) {
        files.forEach(file => {
            const { filename, fieldname } = file
            const filePath = `public/uploads/${fieldname === 'businessLicence' ? "businessLicence" : "citizenship"}/${filename}`;
            fs.unlinkSync(filePath)
        })
        return res.status(400).json({ error: `${3 - files.length} documents are missing` })
    }
    let docs = new BusinessInfo()
    docs = _.extend(docs, req.body)
    files.forEach(async file => {
        const { filename, fieldname } = file
        docs[fieldname] = `${fieldname === 'businessLicence' ? "businessLicence" : "citizenship"}/${filename}`;
    })
    docs.admin = profile._id
    profile.businessInfo = docs._id
    await task
        .save(docs)
        .update(req.profile, profile)
        .options({ viaSave: true })
        .run({ useMongoose: true })
    res.json(docs)
}


exports.getBankInfo = async (req, res) => {
    let bankinfo = await AdminBank.findOne({ admin: req.profile._id })
    if (!bankinfo) {
        return res.status(404).json({ error: "No bank information." })
    }
    res.json(bankinfo)
}

exports.bankinfo = async (req, res) => {
    if (req.file) {
        const { filename, destination, path: filepath } = req.file;
        await sharp(filepath)
            .resize(400)
            .toFile(path.resolve(destination, "bank", filename))//add file from uploads to doc folder
        fs.unlinkSync(filepath);//and remove file from public/uploads
    }
    let profile = req.profile.toObject()
    const { adminBank } = profile
    if (adminBank) {
        let docs = await AdminBank.findById(adminBank)
        //remove old file and update with new one
        docs = _.extend(docs, req.body)
        // update cheque file
        if (req.file) {
            const { filename } = req.file
            const filePath = `public/uploads/${docs["chequeCopy"]}`
            fs.unlinkSync(filePath)//remove old file from respective folders
            docs["chequeCopy"] = `bank/${filename}`;//updating docs
        }
        docs.isVerified = null
        await docs.save()
        //db transaction gareko chaina 
        profile.isVerified = null
        await profile.save()
        return res.json(docs)
    }
    //first check if cheque is empty or not
    if (!req.file) return res.status(400).json({ error: "Cheque copy is required" })

    let docs = new AdminBank()
    docs = _.extend(docs, req.body)
    const { filename } = req.file
    docs["chequeCopy"] = `bank/${filename}`;
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
        await warehouseInfo.save()
        //db transaction gareko chaina 
        profile.isVerified = null
        await profile.save()
        return res.json(warehouseInfo)
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