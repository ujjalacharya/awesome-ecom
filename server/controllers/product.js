const Admin = require("../models/Admin");
const Category = require("../models/Category")
const Product = require("../models/Product")
const shortid = require('shortid');
const sharp = require("sharp")
const path = require("path");
const fs = require("fs");
const _ = require('lodash');
const Fawn = require("fawn");
const task = Fawn.Task();
const perPage = 10;

exports.getProducts = async (req, res) => {
    const page = req.query.page || 1
    const products = await Product.find()
        .populate("category", "displayName")
        .populate("soldBy", "name shopName")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!products.length) {
        return res.status(404).json({ error: 'No products are available.' })
    }
    res.json(products);
}

exports.createProduct = async (req, res) => {
    if (!req.files.length) {
        return res.status(400).error({ error: "Product images are required" })
    }
    let newProduct = new Product(req.body)
    newProduct.soldBy = req.profile._id

    // make copy of 1 image as a thumbnail of product and move to the uploads/productThumbnail folder
    const { filename, destination, path: filepath } = req.files[0]
    await sharp(filepath)
        .resize(80)
        .toFile(path.resolve(destination, 'productThumbnail', filename))
    // add path to the product collection
    newProduct.productThumbnail = `productThumbnail/${filename}`

    // make copy of 1 image as a mediumsize of product and move to the uploads/productMedium folder
    await sharp(filepath)
        .resize(540)
        .toFile(path.resolve(destination, 'productMedium', filename))
    // add path to the product collection
    newProduct.productMedium = `productMedium/${filename}`

    // now copy all images nd resize with upperlimit of 900px and move to uploads/productLarge folder,finally remove all images from public/uploads
    req.files.forEach(async file => {
        const { filename, destination, path: filepath } = file;
        await sharp(filepath)
            .resize(800)
            .toFile(path.resolve(destination, 'productLarge', filename))
        // remove image from public/uploads
        const Path = `public/uploads/${filename}`;
        fs.unlinkSync(Path);
    })
    // add images path to the product collection
    newProduct.productLarge = req.files.map(file => `productLarge/${file.filename}` )

    // save the product
    newProduct = await newProduct.save()

    return res.json(newProduct)
}