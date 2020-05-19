const Admin = require("../models/Admin");
const Category = require("../models/Category")
const Product = require("../models/Product")
const ProductBrand = require("../models/ProductBrand")
const ProductImages = require("../models/ProductImages")
const shortid = require('shortid');
const sharp = require("sharp")
const path = require("path");
const fs = require("fs");
const _ = require('lodash');
const Fawn = require("fawn");
const task = Fawn.Task();
const perPage = 10;

exports.product = async (req, res, next) => {
    const product = await Product.findOne({ slug: req.params.p_slug })
    if (!product) {
        return res.status(404).json({ error: 'Product not found.' })
    }
    req.product = product
    next();
}

exports.getProduct = (req, res) => {
    res.json(req.product);
}

exports.productBrand = async (req, res) => {
    let text = req.query.brand;

    let results = [];
    let brands = await ProductBrand.find()
    brands = brands[0].brand
    if (!brands.length) {
        res.status(404).json({ error: "Product brands are unavailable at the moment. Please try again letter." })
    }
    brands.forEach(brand => {
        if (brand.toLowerCase().indexOf(text.toLowerCase()) > -1) {
            results.push(brand)
        }
    })
    if (results.length > 7) results.length = 7
    return res.json(results)
}

exports.createProduct = async (req, res) => {

    const category = await Category.findById(req.body.category)

    if (!category) return res.status(404).json({ error: "Category not found." })
    if (category.isDisabled) return res.status(403).json({ error: "Category has been disabled" })
    if (!req.profile.isVerified) return res.status(403).json({ error: "Admin is not verified" })
    let newProduct = new Product(req.body)
    newProduct.soldBy = req.profile._id

    // save the product
    newProduct = await newProduct.save()

    return res.json(newProduct)
}

exports.productImages = async (req, res) => {
    if (!req.files.length) {
        return res.status(400).error({ error: "Product images are required" })
    }
    if (!req.profile.isVerified) {
        req.files.forEach(file => {
            const { filename } = file;
            // remove image from public/uploads
            const Path = `public/uploads/${filename}`;
            fs.unlinkSync(Path);
        })
        return res.status(403).json({ error: "Admin is not verified" })
    }
    const compressImage = async (filename, size, filepath, destination, foldername) => {
        await sharp(filepath)
        .resize(size)
        .toFile(path.resolve(destination, `${foldername}`, filename))
        return `${foldername}/${filename}`
    }
    let images = req.files.map(async file => {
        const image = new ProductImages()
        const { filename, path: filepath, destination } = file
        image.thumbnail = await compressImage(filename, 80, filepath, destination, 'productThumbnail')
        image.medium = await compressImage(filename, 540, filepath, destination, 'productMedium')
        image.large = await compressImage(filename, 800, filepath, destination, 'productLarge')
        // remove image from public/uploads
        const Path = `public/uploads/${filename}`;
        fs.unlinkSync(Path);
        return await image.save()
    })
    images = await Promise.all(images)
    res.json(images)


}

exports.updateProduct = async (req, res) => {
    let product = req.product
    if (product.isVerified) {
        return res.status(403).json({ error: 'Cannot update. Product has already been verified.' })
    }
    product = _.extend(product, req.body)
    if (req.files.length) {
        // make copy of 1 image as a thumbnail of product and move to the uploads/productThumbnail folder
        const { filename, destination, path: filepath } = req.files[0]
        await sharp(filepath)
            .resize(80)
            .toFile(path.resolve(destination, 'productThumbnail', filename))
        //remove old thumbnail
        if (product.productThumbnail) fs.unlinkSync(`public/uploads/${product.productThumbnail}`)
        // add path to the product collection
        product.productThumbnail = `productThumbnail/${filename}`

        // make copy of 1 image as a mediumsize of product and move to the uploads/productMedium folder
        await sharp(filepath)
            .resize(540)
            .toFile(path.resolve(destination, 'productMedium', filename))
        //remove old medium image
        if (product.productMedium) fs.unlinkSync(`public/uploads/${product.productMedium}`)
        // add path to the product collection
        product.productMedium = `productMedium/${filename}`

        // now copy all images nd resize with upperlimit of 900px and move to uploads/productLarge folder,finally remove all images from public/uploads
        req.files.forEach(async file => {
            const { filename, destination, path: filepath } = file;
            await sharp(filepath)
                .resize(800)
                .toFile(path.resolve(destination, 'productLarge', filename))

            if (product.productLarge) {
                const oldPath = `public/uploads/${product.productLarge}`
                fs.unlinkSync(oldPath)
            }
            // remove image from public/uploads
            const Path = `public/uploads/${filename}`;
            fs.unlinkSync(Path);
        })
        // add images path to the product collection
        product.productLarge = req.files.map(file => `productLarge/${file.filename}`)
    }
    console.log(product);
    await product.save()
    res.json(product)

}
