const Admin = require("../models/Admin");
const User = require("../models/User")
const BusinessInfo = require("../models/BusinessInfo")
const AdminBank = require("../models/AdminBank")
const AdminWarehouse = require("../models/AdminWarehouse")
const ProductBrand = require("../models/ProductBrand")
const Banner = require("../models/Banner")
const Category = require("../models/Category")
const Product = require("../models/Product")
const Remark = require("../models/Remark")
const shortid = require('shortid');
const sharp = require("sharp")
const path = require("path");
const fs = require("fs");
const _ = require('lodash');
const Fawn = require("fawn");
const task = Fawn.Task();
// const perPage = 10;

exports.geoLocation = async (req, res) => {
    let superadmin = req.admin// req.admin is superadmin
    if (req.body.lat && req.body.long) {
        let geolocation = {
            type: "Point",
            coordinates: [req.body.long, req.body.lat]
        };
        superadmin.geolocation = geolocation;
        superadmin = await superadmin.save()
        return res.json(superadmin)
    }
}

exports.getGeoLocation = async (req, res) => {
    let superadmin = await Admin.findOne({ role: 'superadmin' })
    if (!superadmin) {
        return res.status(404).json({ error: 'Cannot find geolocation' })
    }
    res.json(superadmin.geolocation)
}

exports.shippingData = async (req, res) => {
    let superadmin = req.admin //i.e. superadmin
    superadmin.shippingRate = req.body.shippingRate
    superadmin.shippingCost = req.body.shippingCost
    await superadmin.save()
    res.json({ shippingRate: superadmin.shippingRate, shippingCost: superadmin.shippingCost})
}

exports.getShippingData = async (req, res) => {
    let superadmin = await Admin.findOne({ role: 'superadmin' })
    if (!superadmin) {
        return res.status(404).json({ error: 'Cannot find shipping rate' })
    }
    res.json({ shippingRate: superadmin.shippingRate, shippingCost: superadmin.shippingCost })
}

exports.banner = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Banner image is required" })
    }
    let newBanner = new Banner()
    if (req.body.productSlug) {
        let product = await Product.findOne({
            slug: req.body.productSlug, isVerified: { "$ne": null },
            isDeleted: null
        })
        if (!product) {
            const { filename } = req.file;
            // remove image from public/uploads
            const Path = `public/uploads/${filename}`;
            fs.unlinkSync(Path);
            return res.status(404).json({ error: "Product not found." })
        }
        newBanner.product = product._id
    }
    const { filename, path: filepath, destination } = req.file
    await sharp(filepath)
        .resize(8480)
        .toFile(path.resolve(destination, 'banner', filename))
    // remove image from public/uploads
    const Path = `public/uploads/${filename}`;
    fs.unlinkSync(Path);
    newBanner.bannerPhoto = `banner/${filename}`
    newBanner.link = req.body.link
    await newBanner.save()
    res.json(newBanner)
}

exports.editBanner = async(req,res) => {
    let banner = await Banner.findById(req.body.banner_id)
    if (!banner) {
        if (req.file) {
            const { filename } = req.file;
            // remove image from public/uploads
            const Path = `public/uploads/${filename}`;
            fs.unlinkSync(Path);
        }
        return res.status(404).json({ error: 'Banner not found.' })
    }
    if (req.body.productSlug) {
        let product = await Product.findOne({
            slug: req.body.productSlug, isVerified: { "$ne": null },
            isDeleted: null
        })
        if (!product) {
            if (req.file) {
                const { filename } = req.file;
                // remove image from public/uploads
                const Path = `public/uploads/${filename}`;
                fs.unlinkSync(Path);
            }
            return res.status(404).json({ error: "Product not found." })
        }
        banner.product = product._id
    }
    if (req.file) {
        const { filename, path: filepath, destination } = req.file
        await sharp(filepath)
            .resize(8480)
            .toFile(path.resolve(destination, 'banner', filename))
        //remove old banner pic from bannner folder
        let Path = `public/uploads/${banner.bannerPhoto}`;
        fs.unlinkSync(Path);
        // remove image from public/uploads
        Path = `public/uploads/${filename}`;
        fs.unlinkSync(Path);
        banner.bannerPhoto = `banner/${filename}`
    }
    banner.link = req.body.link
    await banner.save()
    res.json(banner)
}

exports.deleteBanner = async (req, res) => {
    let banner = await Banner.findById(req.body.banner_id)
    if (!banner) {
        return res.status(404).json({ error: 'Banner not found.' })
    }
    banner.isDeleted = Date.now()
    await banner.save()
    res.json(banner)
}

exports.getBanners = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10;
    let banners = await Banner.find({ isDeleted: null })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!banners.length) {
    //     return res.status(404).json({ error: 'Banners not available.' })
    // }
    const totalCount = await Banner.countDocuments({ isDeleted: null })
    res.json({banners,totalCount})
}

exports.getDeletedBanners = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10;
    let banners = await Banner.find({ isDeleted: { "$ne": null } })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!banners.length) {
    //     return res.status(404).json({ error: 'Banners not available.' })
    // }
    const totalCount = await Banner.countDocuments({ isDeleted: { "$ne": null } })
    res.json({ banners, totalCount })
}

exports.getAllAdmins = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10;
    const admins = await Admin.find({})
        .select("-password -salt")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!admins.length) {
    //     return res.status(404).json({ error: 'No Admins are Available' })
    // }
    const totalCount = await Admin.countDocuments()
    res.json({ admins, totalCount })
}

exports.flipAdminBusinessApproval = async (req, res) => {
    let businessInfo = await BusinessInfo.findById(req.params.b_id)
    if (!businessInfo) {
        return res.status(404).json({ error: "No business information available" })
    }
    if (businessInfo.isVerified) {
        let updateBusinessInfo = businessInfo.toObject()
        updateBusinessInfo.isVerified = null
        let admin = await Admin.findById(businessInfo.admin)
        let updateAdmin = admin.toObject()
        updateAdmin.isVerified = null
        const results = await task
            .update(businessInfo, updateBusinessInfo)
            .update(Admin, updateAdmin)
            .options({ viaSave: true })
            .run({ useMongoose: true })
        return res.json(results[0])
    }
    businessInfo.isVerified = Date.now()
    await businessInfo.save()
    res.json(businessInfo)
}

exports.flipAdminBankApproval = async (req, res) => {
    let bankInfo = await AdminBank.findById(req.params.bank_id)
    if (!bankInfo) {
        return res.status(404).json({ error: "No bank information available" })
    }
    if (bankInfo.isVerified) {
        let updateBankInfo = bankInfo.toObject()
        updateBankInfo.isVerified = null
        let admin = await Admin.findById(bankInfo.admin)
        let updateAdmin = admin.toObject()
        updateAdmin.isVerified = null
        const results = await task
            .update(bankInfo, updateBankInfo)
            .update(Admin, updateAdmin)
            .options({ useSave: true })
            .run({ useMongoose: true })
        return res.json(results[0])
    }
    bankInfo.isVerified = Date.now()
    await bankInfo.save()
    res.json(bankInfo)
}

exports.flipAdminWarehouseApproval = async (req, res) => {
    let warehouse = await AdminWarehouse.findById(req.params.w_id)
    if (!warehouse) {
        return res.status(404).json({ error: "No warehouse information available" })
    }

    if (warehouse.isVerified) {
        let updateWareHouse = warehouse.toObject()
        updateWareHouse.isVerified = null
        let admin = await Admin.findById(warehouse.admin)
        let updateAdmin = admin.toObject()
        updateAdmin.isVerified = null
        const results = await task
            .update(warehouse, updateWareHouse)
            .update(admin, updateAdmin)
            .options({ viaSave: true })
            .run({ useMongoose: true })
        return res.json(results[0])
    }
    warehouse.isVerified = Date.now()
    await warehouse.save()
    res.json(warehouse)
}

exports.flipAdminAccountApproval = async (req, res) => {
    let adminAccount = await await Admin.findById(req.params.a_id)
        .select('-password -salt -resetPasswordLink ')
        .populate('businessInfo', 'isVerified')
        .populate('adminBank', 'isVerified')
        .populate('adminWareHouse', 'isVerified')
    if (!adminAccount) {
        return res.status(404).json({ error: "Account has not been created." })
    }
    if (adminAccount.emailVerifyLink) {
        return res.status(403).json({ error: "Admin email has not been verified." })
    }
    if (adminAccount.isBlocked) {
        return res.status(403).json({ error: "Admin is blocked." })
    }
    if (adminAccount.emailVerifyLink) {
        return res.status(403).json({ error: "Admin's email has not been verified." })
    }
    if (!adminAccount.businessInfo.isVerified) {
        return res.status(403).json({ error: "Admin's business information has not been verified." })
    }
    if (!adminAccount.adminBank.isVerified) {
        return res.status(403).json({ error: "Admin's bank information has not been verified." })
    }
    if (!adminAccount.adminWareHouse.isVerified) {
        return res.status(403).json({ error: "Admin's warehouse information has not been verified." })
    }
    if (adminAccount.isVerified) {
        adminAccount.isVerified = null
        await adminAccount.save()
        return res.json(adminAccount)
    }
    adminAccount.isVerified = Date.now()
    await adminAccount.save()
    res.json(adminAccount)
}

exports.blockUnblockAdmin = async (req, res) => {
    let admin = await Admin.findById(req.params.id).select('-password -salt -resetPasswordLink -emailVerifyLink')
    if (!admin) {
        return res.status(404).json({ error: "Admin not found" })
    }
    if (admin.isBlocked) {
        admin.isBlocked = null
        await admin.save()
        return res.json(admin)
    }
    admin.isBlocked = Date.now()
    admin.isVerified = null
    await admin.save()
    res.json(admin)
}

exports.blockUnblockUser = async (req, res) => {
    let user = await User.findById(req.params.user_id).select('-password -salt -resetPasswordLink -emailVerifyLink')
    if (!user) {
        return res.status(404).json({ error: "User not found" })
    }
    if (user.isBlocked) {
        user.isBlocked = null
        await user.save()
        return res.json(user)
    }
    user.isBlocked = Date.now()
    await user.save()
    res.json(user)
}

exports.getBlockedAdmins = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10
    let admins = await Admin.find({ isBlocked: { "$ne": null } })
        .select('-password -salt')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!admins.length) {
    //     return res.status(404).json({ error: "No admins are blocked" })
    // }
    const totalCount = await Admin.countDocuments({ isBlocked: { "$ne": null } })
    res.json({admins,totalCount})
}
exports.getNotBlockedAdmins = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10
    let admins = await Admin.find({ isBlocked: null })
        .select('-password -salt')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!admins.length) {
    //     return res.status(404).json({ error: "Every admins are blocked" })
    // }
    const totalCount = await Admin.countDocuments({ isBlocked: null })
    res.json({ admins, totalCount })
}
exports.getVerifiedAdmins = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10
    let admins = await Admin.find({ isVerified: { "$ne": null } })
        .select('-password -salt')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!admins.length) {
    //     return res.status(404).json({ error: "No admins are verified" })
    // }
    const totalCount = await Admin.countDocuments({ isVerified: { "$ne": null } })
    res.json({ admins, totalCount })
}
exports.getUnverifiedAdmins = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10
    let admins = await Admin.find({ isVerified: null })
        .select('-password -salt')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!admins.length) {
    //     return res.status(404).json({ error: "All admins are verified" })
    // }
    const totalCount = await Admin.countDocuments({ isVerified: null })
    res.json({ admins, totalCount })
}

exports.category = async (req, res) => {
    const { displayName, parent_id, category_slug } = req.body
    const systemName = shortid.generate()
    let updateCategory;
    if (category_slug) {
        updateCategory = await Category.findOne({ slug: category_slug })
        if (!updateCategory) {
            return res.status(404).json({ error: "Category not found." })
        }
    }
    if (updateCategory) {
        // then update
        updateCategory.displayName = displayName
        updateCategory.parent = parent_id
        await updateCategory.save()
        return res.json(updateCategory)
    }
    let category = await Category.findOne({ displayName })
    if (category) {
        return res.status(403).json({ error: "Category already exist" })
    }
    category = new Category({ systemName, displayName, parent: parent_id })
    await category.save()
    res.json(category)
}
exports.getCategories = async (req, res) => {
    let categories = await Category.find()
    // if (!categories.length) {
    //     return res.status(404).json({ error: "No categories are available" })
    // }
    let totalCount = await Category.countDocuments()
    res.json({categories,totalCount})

    // product -> this.category ID
    // product -> this.brand ID

    // this.category.brand Arr -> product -> this.category => brand

    //     let products = await Product.find({})

    //     let finalCat = [];

    //     products.forEach((pr, i) => {
    //             finalCat.push({
    //                 category: pr.category,
    //                 brand: pr.brand,
    //             })
    //     })
    //     finalCat = Array.from(new Set(finalCat.map(JSON.stringify))).map(JSON.parse)

    //    finalCat = finalCat.map( async data => {
    //        const cat = await Category.findById(data.category)
    //        cat.brands.push(data.brand)
    //        return await cat.save()
    //    })
    //    finalCat = await Promise.all(finalCat)
    //     res.json(finalCat)




    // products = await Category.find()
    // products = products.map(async c=> {
    //     c.brands = []
    //     return await c.save()
    // })
    // let c = await Promise.all(products)
    //  c = (await ProductBrand.find())
    // res.json(c)
}

exports.flipCategoryAvailablity = async (req, res) => {
    let category = await Category.findOne({ slug: req.query.category_slug })
    if (!category) {
        return res.status(404).json({ error: "Category not found" })
    }
    if (category.isDisabled) {
        category.isDisabled = null
        await category.save()
        return res.json(category)
    }
    category.isDisabled = Date.now()
    await category.save()
    res.json(category)
}
exports.approveProduct = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.p_slug })
    if (!product) {
        return res.status(404).json({ error: "Product not found" })
    }
    let categories = await Category.find({ _id: product.category })//may b array of category as well
    if (!categories.length) {
        return res.status(404).json({ error: "Categories not found of this product." })
    }

    // if product has new brand 
    const addBrandToCategory = (brand, categories) => categories.forEach(cat => {
        if (!cat.brands.includes(brand)) cat.brands.push(brand)
        const updateCat = cat.toObject()
        task.update(cat, updateCat).options({ viaSave: true })
    })


    if (!product.remark) {
        const updateProduct = product.toObject()
        updateProduct.isVerified = Date.now()
        addBrandToCategory(updateProduct.brand, categories)
        const results = await task
            .update(product, updateProduct)
            .options({ viaSave: true })
            .run({ useMongoose: true })
        return res.json(results[results.length - 1])//the product
    }


    const remark = await Remark.findById(product.remark)
    const updateRemark = remark.toObject()
    updateRemark.isDeleted = Date.now()

    const updateProduct = product.toObject()
    updateProduct.isVerified = Date.now()
    addBrandToCategory(updateProduct.brand, categories)
    const results = await task
        .update(remark, updateRemark)
        .update(product, updateProduct)
        .options({ viaSave: true })
        .run({ useMongoose: true })
    return res.json(results)//the product with remark

}
exports.disApproveProduct = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.p_slug })
    if (!product) {
        return res.status(404).json({ error: "Product not found" })
    }
    const newRemark = new Remark(req.body)
    const updateProduct = product.toObject()
    updateProduct.isVerified = null
    updateProduct.remark = newRemark._id
    const results = await task
        .save(newRemark)
        .update(product, updateProduct)
        .options({ viaSave: true })
        .run({ useMongoose: true })
    return res.json(results)
}

exports.getProducts = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10
    let products = await Product.find()
        .populate("category", "displayName slug")
        .populate("brand", "brandName slug")
        .populate("soldBy", "name shopName")
        .populate("images", "-createdAt -updatedAt -__v")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ createdAt: 1 })
    // if (!products.length) {
    //     return res.status(404).json({ error: 'No products are available.' })
    // }

    // let products = await Product.find()
    // products = products.map(async product => {
    //     product.quantity += 50
    // return await product.save()
    // })
    // products = await Promise.all(products)
    let totalCount = await Product.countDocuments()
    res.json({products,totalCount});
}
exports.verifiedProducts = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10
    const products = await Product.find({ isVerified: { "$ne": null } })
        .populate("category", "displayName slug")
        .populate("brand", "brandName slug")
        .populate("soldBy", "name shopName")
        .populate("images", "-createdAt -updatedAt -__v")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    // if (!products.length) {
    //     return res.status(404).json({ error: 'No products are available.' })
    // }
    //make 3 products of every admin verified
    // const admins = await Admin.find({role:'admin'})
    // let products = admins.map(async a => {
    //     const products = await Product.find({soldBy:a._id})
    //     for (let i = 0; i < 3; i++) {
    //         const element = products[i];
    //         element.isVerified = Date.now()
    //         await products[i].save()
    //     }
    //     return products
    // })
    // products = await Promise.all(products)

    let totalCount = await Product.countDocuments({ isVerified: { "$ne": null } })
    res.json({ products, totalCount });
}
exports.notVerifiedProducts = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10
    const products = await Product.find({ isVerified: null })
        .populate("category", "displayName slug")
        .populate("brand", "brandName slug")
        .populate("soldBy", "name shopName")
        .populate("images", "-createdAt -updatedAt -__v")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    // if (!products.length) {
    //     return res.status(404).json({ error: 'No products are available.' })
    // }
    let totalCount = await Product.countDocuments({ isVerified: null })
    res.json({ products, totalCount });
}
exports.deletedProducts = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10
    const products = await Product.find({ isDeleted: { "$ne": null } })
        .populate("category", "displayName slug")
        .populate("brand", "brandName slug")
        .populate("soldBy", "name shopName")
        .populate("images", "-createdAt -updatedAt -__v")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    // if (!products.length) {
    //     return res.status(404).json({ error: 'No products are available.' })
    // }
    let totalCount = await Product.countDocuments({ isDeleted: { "$ne": null } })
    res.json({ products, totalCount });
}
exports.notDeletedProducts = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10
    const products = await Product.find({ isDeleted: null })
        .populate("category", "displayName slug")
        .populate("brand", "brandName slug")
        .populate("soldBy", "name shopName")
        .populate("images", "-createdAt -updatedAt -__v")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    // if (!products.length) {
    //     return res.status(404).json({ error: 'No products are available.' })
    // }
    let totalCount = await Product.countDocuments({ isDeleted: null })
    res.json({ products, totalCount });
}

exports.productBrand = async (req, res) => {
    const { brandName, brand_id } = req.body
    const systemName = shortid.generate()
    if (brand_id) {
        let updateBrand = await ProductBrand.findById(brand_id)
        if (!updateBrand) {
            return res.status(404).json({ error: "Product brand not found." })
        }
        // then update
        updateBrand.brandName = brandName
        await updateBrand.save()
        return res.json(updateBrand)
    }
    let newBrand = await ProductBrand.findOne({ brandName })
    if (newBrand) {
        return res.status(403).json({ error: "Product brand already exist" })
    }
    newBrand = new ProductBrand({ systemName, brandName })
    await newBrand.save()
    res.json(newBrand)
}

exports.getProductBrands = async (req, res) => {
    let productbrands = await ProductBrand.find()
    // if (!productbrands.length) {
    //     return res.status(404).json({ error: "No product brands are available" })
    // }
    res.json(productbrands)

}