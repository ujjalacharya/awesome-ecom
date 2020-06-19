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
// const Fawn = require("fawn");
// const task = Fawn.Task();
const perPage = 10;

exports.geoLocation = async(req,res) => {
    let superadmin = req.admin// req.admin is superadmin
    if ( req.body.lat && req.body.long) {
        let geolocation = {
            type: "Point",
            coordinates: [req.body.long, req.body.lat]
        };
        superadmin.geolocation = geolocation;
        superadmin = await superadmin.save()
        return res.json(superadmin)
    }
}

exports.getGeoLocation = async(req,res) => {
    let superadmin = await Admin.findOne({role:'superadmin'})
    if (!superadmin) {
        return res.status(404).json({error: 'Cannot find geolocation'})
    }
    res.json(superadmin.geolocation)
}

exports.shippingRate = async(req,res) => {
    let superadmin = req.admin //i.e. superadmin
    superadmin.shippingRate = req.body.shippingRate
    await superadmin.save()
    res.json(superadmin.shippingRate)
}

exports.getShippingRate = async(req,res) => {
    let superadmin = await Admin.findOne({ role: 'superadmin' })
    if (!superadmin) {
        return res.status(404).json({ error: 'Cannot find shipping rate' })
    }
    res.json(superadmin.shippingRate)
}

exports.banner = async(req,res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Banner image is required" })
    }
    let newBanner = new Banner()
    if (req.body.productSlug) {
        let product = await Product.findOne({ slug: req.body.productSlug,isVerified: { "$ne": null },
            isDeleted: null})
        if (!product) {
            const { filename } = req.file;
            // remove image from public/uploads
            const Path = `public/uploads/${filename}`;
            fs.unlinkSync(Path);
            return res.status(403).json({ error: "Product not found." })
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
    await newBanner.save()
    res.json(newBanner)
}
exports.deleteBanner = async(req,res) => {
    let banner = await Banner.findById(req.body.banner_id)
    if (!banner) {
        return res.status(404).json({ error: 'Banner not found.' })
    }
    banner.isDeleted = Date.now()
    await banner.save()
    res.json(banner)
}

exports.getBanners = async(req,res) => {
    let banners = await Banner.find({ isDeleted: { "$ne": null }})
    if (!banners.length) {
        return res.json({error: 'Banners not available.'})
    }
    res.json(banners)
}

exports.getDeletedBanners = async (req, res) => {
    let banners = await Banner.find({ isDeleted: null  })
    if (!banners.length) {
        return res.json({ error: 'Banners not available.' })
    }
    res.json(banners)
}

exports.getAllAdmins = async (req, res) => {
    const page = req.query.page || 1;
    const admins = await Admin.find({})
        .select("-password -salt").skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    if (!admins.length) {
        return res.status(404).json({ error: 'No Admins are Available' })
    }
    res.json(admins)
}

exports.flipAdminBusinessApproval = async (req, res) => {
    //fawn was used
    let businessInfo = await BusinessInfo.findById(req.params.b_id).populate('admin','isVerified')
    if (!businessInfo) {
        return res.status(404).json({ error: "No business information available" })
    }
    if (businessInfo.isVerified) {
        businessInfo.isVerified = null
        businessInfo.admin.isVerified = null
        await businessInfo.admin.save()
        await businessInfo.save()
        return res.json(businessInfo)
    }
    businessInfo.isVerified = Date.now()
    await businessInfo.save()
    res.json(businessInfo)
}

exports.flipAdminBankApproval = async (req, res) => {
    //fawn was used
    let bankInfo = await (await AdminBank.findById(req.params.bank_id)).populate('admin', 'isVerified')
    if (!bankInfo) {
        return res.status(404).json({ error: "No bank information available" })
    }
    if (bankInfo.isVerified) {
        bankInfo.isVerified = null
        bankInfo.admin.isVerified = null
        await bankInfo.admin.save()
        await bankInfo.save()
        return res.json(bankInfo)
    }
    bankInfo.isVerified = Date.now()
    await bankInfo.save()
    res.json(bankInfo)
}

exports.flipAdminWarehouseApproval = async (req, res) => {
    //fawn was used
    let warehouse = await AdminWarehouse.findById(req.params.w_id).populate('admin', 'isVerified')
    if (!warehouse) {
        return res.status(404).json({ error: "No warehouse information available" })
    }

    if (warehouse.isVerified) {
        warehouse.isVerified = null
        warehouse.admin.isVerified = null
        await warehouse.admin.save()
        await warehouse.save()
        return res.json(warehouse)
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
    const page = req.query.page || 1
    let admins = await Admin.find({ isBlocked: { "$ne": null } })
        .select('-password -salt')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    if (!admins.length) {
        return res.status(404).json({ error: "No admins are blocked" })
    }
    res.json(admins)
}
exports.getNotBlockedAdmins = async (req, res) => {
    const page = req.query.page || 1
    let admins = await Admin.find({ isBlocked: null })
        .select('-password -salt')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    if (!admins.length) {
        return res.status(404).json({ error: "Every admins are blocked" })
    }
    res.json(admins)
}
exports.getVerifiedAdmins = async (req, res) => {
    const page = req.query.page || 1
    let admins = await Admin.find({ isVerified: { "$ne": null } })
        .select('-password -salt')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    if (!admins.length) {
        return res.status(404).json({ error: "No admins are verified" })
    }
    res.json(admins)
}
exports.getUnverifiedAdmins = async (req, res) => {
    const page = req.query.page || 1
    let admins = await Admin.find({ isVerified: null })
        .select('-password -salt')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    if (!admins.length) {
        return res.status(404).json({ error: "All admins are verified" })
    }
    res.json(admins)
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
    if (!categories.length) {
        return res.status(404).json({ error: "No categories are available" })
    }
    res.json(categories)

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
    let category = await Category.findOne({slug:req.query.category_slug})
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
    //fawn was used
    const product = await Product.findOne({ slug: req.params.p_slug }).populate('remark')
    if (!product) {
        return res.status(404).json({ error: "Product not found" })
    }
    let categories = await Category.find({_id:product.category})//may b array of category as well
    if (!categories.length) {
        return res.status(404).json({error: "Categories not found of this product."})
    }

    const addBrandToCategory = async(brand, categories) => {
       let cats =  categories.forEach(async cat => {
        if (!cat.brands.includes(brand)){
            cat.brands.push(brand)
            await cat.save() 
        } 
        return cat
    })
    await Promise.all(cats)
    }
    if (!product.remark) {
        product.isVerified = Date.now()
        await addBrandToCategory(product.brand,categories)
        await product.save()
        return res.json(product)
    }

    product.remark.isDeleted = Date.now()
    product.isVerified = Date.now()
    await addBrandToCategory(updateProduct.brand, categories)
    await product.remark.save()
    await product.save()
    return res.json(product)//the product with remark

}
exports.disApproveProduct = async (req, res) => {
    //fawn was used
    const product = await Product.findOne({ slug: req.params.p_slug })
    if (!product) {
        return res.status(404).json({ error: "Product not found" })
    }
    const newRemark = new Remark(req.body)
    product.isVerified = null
    product.remark = newRemark._id
    await newRemark.save()
    await product.save()
    return res.json(results)
}

exports.getProducts = async (req, res) => {
    const page = req.query.page || 1
    let products = await Product.find()
        .populate("category", "displayName slug")
        .populate("brand", "brandName slug")
        .populate("soldBy", "name shopName")
        .populate("images", "-createdAt -updatedAt -__v")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!products.length) {
        return res.status(404).json({ error: 'No products are available.' })
    }

    // let products = await Product.find()
    // products = products.map(async product => {
    //     console.log(product.color);
        // product.color = product.color[0].split(',').map(color=>color.trim())
        // return await product.save()
    // })
    // products = await Promise.all(products)
    res.json(products);
}
exports.verifiedProducts = async (req, res) => {
    const page = req.query.page || 1
    const products = await Product.find({ isVerified: { "$ne": null } })
        .populate("category", "displayName slug")
        .populate("brand", "brandName slug")
        .populate("soldBy", "name shopName")
        .populate("images", "-createdAt -updatedAt -__v")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!products.length) {
        return res.status(404).json({ error: 'No products are available.' })
    }
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

    res.json(products);
}
exports.notVerifiedProducts = async (req, res) => {
    const page = req.query.page || 1
    const products = await Product.find({ isVerified: null })
        .populate("category", "displayName slug")
        .populate("brand", "brandName slug")
        .populate("soldBy", "name shopName")
        .populate("images", "-createdAt -updatedAt -__v")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!products.length) {
        return res.status(404).json({ error: 'No products are available.' })
    }
    res.json(products);
}
exports.deletedProducts = async (req, res) => {
    const page = req.query.page || 1
    const products = await Product.find({ isDeleted: { "$ne": null } })
        .populate("category", "displayName slug")
        .populate("brand", "brandName slug")
        .populate("soldBy", "name shopName")
        .populate("images", "-createdAt -updatedAt -__v")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!products.length) {
        return res.status(404).json({ error: 'No products are available.' })
    }
    res.json(products);
}
exports.notDeletedProducts = async (req, res) => {
    const page = req.query.page || 1
    const products = await Product.find({ isDeleted: null })
        .populate("category", "displayName slug")
        .populate("brand", "brandName slug")
        .populate("soldBy", "name shopName")
        .populate("images", "-createdAt -updatedAt -__v")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!products.length) {
        return res.status(404).json({ error: 'No products are available.' })
    }
    res.json(products);
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
    if (!productbrands.length) {
        return res.status(404).json({ error: "No product brands are available" })
    }
    res.json(productbrands)

}