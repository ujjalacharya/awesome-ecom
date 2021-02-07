const Admin = require("../models/Admin");
const User = require("../models/User")
const Dispatcher = require("../models/Dispatcher")
const BusinessInfo = require("../models/BusinessInfo")
const AdminBank = require("../models/AdminBank")
const SuggestKeywords = require("../models/SuggestKeywords")
const AdminWarehouse = require("../models/AdminWarehouse")
const ProductBrand = require("../models/ProductBrand")
const getRatingInfo = require("../middleware/user_actions/getRatingInfo")
const Banner = require("../models/Banner")
const Category = require("../models/Category")
const Product = require("../models/Product")
const Lead = require("../models/Lead")
const Remark = require("../models/Remark")
const shortid = require('shortid');
const fs = require("fs");
const _ = require('lodash');
const Fawn = require("fawn");
const Districts = require("../models/Districts");
const { fileRemover, imageCompressor } = require("../middleware/helpers");
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
    // await sharp(filepath)
    //     .resize(8480)
    //     .toFile(path.resolve(destination, 'banner', filename))
    await imageCompressor(
        filename,
        8480,
        filepath,
        destination,
        "banner"
    );
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
        // await sharp(filepath)
        //     .resize(8480)
        //     .toFile(path.resolve(destination, 'banner', filename))
        await imageCompressor(
            filename,
            8480,
            filepath,
            destination,
            "banner"
        );
        //remove old banner pic from bannner folder
        // let Path = `public/uploads/${banner.bannerPhoto}`;
        // fs.unlinkSync(Path);
        // // remove image from public/uploads
        // Path = `public/uploads/${filename}`;
        // fs.unlinkSync(Path);
        let files = [`public/uploads/${banner.bannerPhoto}`, `public/uploads/${filename}`]
        fileRemover(files)
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

exports.addLead = async (req,res) => {
    let lead = await Lead.findOne({email:req.body.email})
    if (lead) {
        return res.status(403).json({error:'Lead has already been created.'})
    }
    let newLead = new Lead({email:req.body.email})
    await newLead.save()
    res.json(newLead)
}


exports.getAdmins = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10;
    const status = req.query.status
    let query = {role:'admin'}
    if (req.query.keyword) query = {
        ...query,
        name: { $regex: req.query.keyword, $options: "i" }
    }
    if (status && status === 'verified') query = {
        ...query,
        isVerified: { $ne: null }
    }
    if (status && status === 'unverified') query = {
        ...query,
        isVerified: null
    }
    if (status && status === 'blocked') query = {
        ...query,
        isBlocked: { $ne: null }
    }
    // if (status && status === 'unblocked') query = {
    // ...query,
    //     isBlocked: null
    // }
    const admins = await Admin.find(query)
        .select("-password -salt -resetPasswordLink -emailVerifyLink")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!admins.length) {
    //     return res.status(404).json({ error: 'No Admins are Available' })
    // }
    const totalCount = await Admin.countDocuments(query)
    res.json({ admins, totalCount })
}

exports.getAllDispatchers = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10;
    const dispatchers = await Dispatcher.find({})
        .select("-password -salt -resetPasswordLink ")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!dispatchers.length) {
    //     return res.status(404).json({ error: 'No Admins are Available' })
    // }
    const totalCount = await Dispatcher.countDocuments()
    res.json({ dispatchers, totalCount })
}

exports.addDispatcher = async(req,res) => {
    let dispatcher = await Dispatcher.findOne({email:req.body.email})
    if (dispatcher) {
        return res.status(403).json({error:'Email is taken.'})
    }
    dispatcher = new Dispatcher(req.body)
    await dispatcher.save()
    dispatcher.password = undefined
    dispatcher.salt = undefined
    dispatcher.resetPasswordLink = undefined
    res.json(dispatcher)
}

exports.editDispatcher = async(req,res) => {
    let dispatcher = await Dispatcher.findById(req.body.dispatcher_id).select('-password -salt -resetPasswordLink')
    if (!dispatcher) {
        return res.status(404).json({error:'Dispatcher not found.'})
    }
    // password update
    if (req.body.oldPassword && req.body.newPassword) {
        let disPatcher = await Dispatcher.findByCredentials(dispatcher.email, req.body.oldPassword)
        if (!disPatcher) {
            return res.status(403).json({
                error: "Wrong Password."
            });
        }
        dispatcher.password = req.body.newPassword
    }

    dispatcher = _.extend(dispatcher,req.body)
    await dispatcher.save()
    dispatcher.password = undefined
    dispatcher.salt = undefined
    res.json(dispatcher)
}

exports.blockUnbolckDispatcher = async (req, res) => {
    let dispatcher = await Dispatcher.findById(req.params.dispatcher_id).select('-password -salt -resetPasswordLink')
    if (!dispatcher) {
        return res.status(404).json({ error: 'Dispatcher not found.' })
    }
    if (dispatcher.isBlocked) {
        dispatcher.isBlocked = null
        await dispatcher.save()
        return res.json(dispatcher)
    }
    dispatcher.isBlocked = Date.now()
    await dispatcher.save()
    res.json(dispatcher)
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
        .select('-password -salt -resetPasswordLink -emailVerifyLink')
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
    let products = await Product.find({soldBy:admin._id})
    admin.isBlocked = Date.now()
    admin.isVerified = null
    await admin.save()
    products = products.map(async p=>{
        p.isVerified = null
        return await p.save()
    })
    await Promise.all(products)
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

exports.getUsers = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10
    const status = req.query.status
    let query = {}
    if (status && status === 'blocked') query = {
        isBlocked: { $ne: null }
    }
    if (status && status === 'unblocked') query = {
        isBlocked: null
    }
    let users = await User.find(query)
        .select('-password -salt -resetPasswordLink -emailVerifyLink')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!users.length) {
    //     return res.status(404).json({ error: "No users are blocked" })
    // }
    const totalCount = await User.countDocuments(query)
    res.json({ users, totalCount })
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

exports.toggleProductFeatured = async (req, res) => {
    let product = await Product.findOne({ slug: req.params.p_slug, isVerified:{$ne:null}, isDeleted:null, isRejected:null })
    if (!product)
        return res
            .status(404)
            .json({ error: "Product not found." });

    product.isFeatured = product.isFeatured ? null : Date.now()
    product = await product.save()
    res.json({ product })
}

exports.approveProduct = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.p_slug }).populate({
        path: "remark",
        model: "remark",
        match:{
          isDeleted:null
        }
    })
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

    //add tags to suggestKeywords 
    const addKeywords = async tags => {
        let keywords = await SuggestKeywords.find().select('-_id keyword')
        keywords = keywords.map(key => key.keyword)
        keywords = _.flattenDeep(keywords)
        let Keywords = tags.map(async tag => {
            if(!keywords.includes(tag)) {
                let newKeyWord = new SuggestKeywords({keyword:tag})
                await newKeyWord.save()
            }
            return tag
        })
        await Promise.all(Keywords)
    }

    //add districts to Districts
    const addDistricts = async districts => {
        let _districts = await Districts.find().select('-_id name')
        _districts = _districts.map(key => key.name)
        _districts = _.flattenDeep(_districts)
        let __districts = districts.map(async district => {
            if (!_districts.includes(district)) {
                let newDistrict = new Districts({ name: district })
                await newDistrict.save()
            }
            return district
        })
        await Promise.all(__districts)
    }

    if (!product.remark.length) {
        const updateProduct = product.toObject()
        updateProduct.isVerified = Date.now()
        updateProduct.isRejected = null
        addBrandToCategory(updateProduct.brand, categories)
        addKeywords(product.tags)
        addDistricts(product.availableDistricts)
        const results = await task
            .update(product, updateProduct)
            .options({ viaSave: true })
            .run({ useMongoose: true })
        return res.json(results[results.length - 1])//the product
    }


    const remark = await Remark.findById(product.remark[0])
    const updateRemark = remark.toObject()
    updateRemark.isDeleted = Date.now()

    const updateProduct = product.toObject()
    updateProduct.isVerified = Date.now()
    updateProduct.isRejected = null
    addBrandToCategory(updateProduct.brand, categories)
    addKeywords(product.tags)
    addDistricts(product.availableDistricts)
    const results = await task
        .update(remark, updateRemark)
        .options({ viaSave: true })
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
    const newRemark = new Remark({
        comment:req.body.comment
    })
    const updateProduct = product.toObject()
    updateProduct.isVerified = null,
    updateProduct.isRejected = Date.now()
    updateProduct.isDeleted = null
    updateProduct.isFeatured = null
    updateProduct.remark.push(newRemark._id)
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
    const { createdAt, updatedAt, price ,status, keyword, outofstock} = req.query

    let sortFactor = { createdAt: 'desc' };
    if (createdAt && (createdAt === 'asc' || createdAt === 'desc')) sortFactor = { createdAt }
    if (updatedAt && (updatedAt === 'asc' || updatedAt === 'desc')) sortFactor = { updatedAt }
    if (price && (price === 'asc' || price === 'desc')) sortFactor = { price }

    let query = { }
    if (keyword) query = {
        ...query,
        name: { $regex: keyword, $options: "i" }
    }
    if (status && status === 'verified') query = {
        ...query,
        isVerified: { $ne: null }
    }
    if (status && status === 'rejected') query = {
        ...query,
        isRejected: { $ne: null }
    }
    if (status && status === 'featured') query = {
        ...query,
        isFeatured: { $ne: null }
    }
    if (status && status === 'unverified') query = {
        ...query,
        isVerified: null
    }
    if (status && status === 'deleted') query = {
        ...query,
        isDeleted: { $ne: null }
    }
    if (status && status === 'notdeleted') query = {
        ...query,
        isDeleted: null
    }
    if (outofstock && outofstock === 'yes') query = {
        ...query,
        quantity: 0
    }

    let products = await Product.find(query)
        .populate("category", "displayName slug")
        .populate("brand", "brandName slug")
        .populate("soldBy", "name shopName")
        .populate("images", "-createdAt -updatedAt -__v")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort(sortFactor)
    //rating on each product
    // products = products.map(async p => {
    //     p.stars = await getRatingInfo(p)
    //     return p
    // })
    // products = await Promise.all(products)
    let totalCount = await Product.countDocuments(query)
    res.json({products,totalCount});
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