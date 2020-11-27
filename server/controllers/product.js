const Admin = require("../models/Admin");
const Category = require("../models/Category");
const Product = require("../models/Product");
const SuggestKeywords = require("../models/SuggestKeywords")
const Cart = require("../models/Cart")
const Review = require("../models/Review")
const Order = require("../models/Order")
const Whislist = require("../models/WishList")
const ProductBrand = require("../models/ProductBrand");
const ProductImages = require("../models/ProductImages");
const userHas = require("../middleware/user_actions/userHas")
const getRatingInfo = require("../middleware/user_actions/getRatingInfo")
const shortid = require("shortid");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const Fawn = require("fawn");
const task = Fawn.Task();
const perPage = 10;

exports.product = async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.p_slug })
    .populate("images", "-createdAt -updatedAt -__v")
    .populate("soldBy", "shopName address holidayMode")
    .populate("brand")
    .populate("category");
  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }
  req.product = product;
  next();
};
exports.getProduct = async (req, res) => {
  if (req.product.isVerified === null && req.product.isDeleted !== null)
    return res
      .status(404)
      .json({ error: "Product is not verified or has been deleted." });
  //user's action on this product
  const { hasBought, hasOnCart, hasOnWishlist, hasReviewed } = await userHas(req.product, req.authUser ,'product')
  //ratings of this product
  const product = req.product.toObject()
  product.stars = await getRatingInfo(req.product)
  product.hasOnCart = hasOnCart
  product.hasBought = hasBought
  product.hasOnWishlist = hasOnWishlist
  product.hasReviewed = hasReviewed
  res.json({product});
};


exports.createProduct = async (req, res) => {
  if (!req.profile.isVerified)
    return res.status(403).json({ error: "Admin is not verified" });
  let newProduct = new Product(req.body);
  newProduct.soldBy = req.profile._id;
  // save the product
  newProduct = await newProduct.save();

  return res.json(newProduct);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.p_slug });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  product.isDeleted = Date.now();
  await product.save();
  res.json(product);
};

exports.productImages = async (req, res) => {
  if (!req.files.length) {
    return res.status(400).error({ error: "Product images are required" });
  }
  if (!req.profile.isVerified) {
    req.files.forEach((file) => {
      const { filename } = file;
      // remove image from public/uploads
      const Path = `public/uploads/${filename}`;
      fs.unlinkSync(Path);
    });
    return res.status(403).json({ error: "Admin is not verified" });
  }
  const compressImage = async (
    filename,
    size,
    filepath,
    destination,
    foldername
  ) => {
    await sharp(filepath)
      .resize(size)
      .toFile(path.resolve(destination, `${foldername}`, filename));
    return `${foldername}/${filename}`;
  };
  let images = req.files.map(async (file) => {
    const image = new ProductImages();
    const { filename, path: filepath, destination } = file;
    image.thumbnail = await compressImage(
      filename,
      80,
      filepath,
      destination,
      "productThumbnail"
    );
    image.medium = await compressImage(
      filename,
      540,
      filepath,
      destination,
      "productMedium"
    );
    image.large = await compressImage(
      filename,
      800,
      filepath,
      destination,
      "productLarge"
    );
    // remove image from public/uploads
    const Path = `public/uploads/${filename}`;
    fs.unlinkSync(Path);
    return await image.save();
  });
  images = await Promise.all(images);
  res.json(images);
};

exports.deleteImage = async (req, res) => {
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
  Path = `public/uploads/${imageFound.medium}`;
  fs.unlinkSync(Path);
  Path = `public/uploads/${imageFound.large}`;
  fs.unlinkSync(Path);
  res.json(updateProduct.images);
};

exports.deleteImageById = async (req, res) => {
  let image = await ProductImages.findByIdAndRemove(req.query.image_id);
  let Path = `public/uploads/${image.thumbnail}`;
  fs.unlinkSync(Path);
  Path = `public/uploads/${image.medium}`;
  fs.unlinkSync(Path);
  Path = `public/uploads/${image.large}`;
  fs.unlinkSync(Path);
  res.json(image);
};

exports.updateProduct = async (req, res) => {
  let product = req.product;
  if (product.isVerified) {
    return res
      .status(403)
      .json({ error: "Cannot update. Product has already been verified." });
  }
  product = _.extend(product, req.body);
  await product.save();
  res.json(product);
};

exports.getProducts = async (req, res) => {
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || 10;
  const {createdAt,updatedAt,price, status, keyword,outofstock} = req.query
  
  let sortFactor = {createdAt:'desc'} ;
  if(createdAt && (createdAt==='asc' || createdAt==='desc')) sortFactor = {createdAt}
  if(updatedAt && (updatedAt==='asc' || updatedAt==='desc')) sortFactor = {updatedAt}
  if(price && (price==='asc' || price==='desc')) sortFactor = {price}
  let query = { soldBy: req.profile._id }
  if(keyword) query = {
    ...query,
    name: { $regex: keyword, $options: "i" }
  }
  if (status && status === 'verified') query = {
    ...query,
    isVerified: { $ne: null }
  }
  if (status && status === 'unverified') query = {
    ...query,
    isVerified: null
  }
  // if (status && status === 'deleted') query = {
  //   ...query,
  //   isDeleted: { $ne: null }
  // }
  // if (status && status === 'notdeleted') query = {
  //   ...query,
  //   isDeleted: null
  // }
  if (outofstock && outofstock === 'yes') query = {
    ...query,
    quantity:0
  }

  let products = await Product.find(query)
    .populate("category", "displayName slug")
    .populate("brand", "brandName slug")
    .populate("images", "-createdAt -updatedAt -__v")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .lean()
    .sort(sortFactor);
  //rating on each product
  // products = products.map(async p => {
  //   p.stars = await getRatingInfo(p)
  //   return p
  // })
  // products = await Promise.all(products)
  const totalCount = await Product.countDocuments(query);
  res.json({ products, totalCount });
};

exports.latestProducts = async (req, res) => {
  let page = +req.query.page || 1;
  let perPage = +req.query.perPage || 10;
  let sortFactor = { createdAt: 'desc' }
  if (req.query.keyword === process.env.LATEST_PRODUCT) {
    page = 1
    perPage = 50
  }
  let products = await Product.find({
    isVerified: { $ne: null },
    isDeleted: null
  })
    .populate("category", "displayName slug")
    .populate("brand", "brandName slug")
    .populate("images", "-createdAt -updatedAt -__v")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .lean()
    .sort(sortFactor);

    let totalCount = await Product.countDocuments({
      isVerified: { $ne: null },
      isDeleted: null,
    })  
    if (totalCount>50) totalCount = 50
    //user's action on each product
    products = products.map(async p => {
      //user's action on this product
      const { hasOnCart, hasOnWishlist } = await userHas(p, req.authUser, 'products')
      //ratings of this product
      // p.stars = await getRatingInfo(p)
      p.hasOnCart = hasOnCart,
      p.hasOnWishlist = hasOnWishlist
      return p
    })
    products = await Promise.all(products)
  res.json({products,totalCount});
};

exports.suggestKeywords = async(req,res) => {
  let limits = +req.query.limits || 5
  let suggestedKeywords = await SuggestKeywords
      .find({ keyword: { $regex: req.query.keyword || '', $options: "i" },isDeleted:null})
      .select('-_id keyword')
      .limit(limits)
  suggestedKeywords = suggestedKeywords.map(s=>s.keyword)
  res.json(suggestedKeywords)
}

exports.searchProducts = async (req, res) => {
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || 10;
  const {createdAt,updatedAt,price} = req.query
  let sortFactor = {createdAt:'desc'} ;
  if(createdAt && (createdAt==='asc' || createdAt==='desc')) sortFactor = {createdAt}
  if(updatedAt && (updatedAt==='asc' || updatedAt==='desc')) sortFactor = {updatedAt}
  if(price && (price === 'asc' || price === 'desc')) sortFactor = {price}
  let {
    keyword = "",
    brands,
    max_price,
    min_price,
    sizes,
    ratings,
    colors,
    warranties,
    weights,
    cat_id,
  } = req.body;
  let categories;
  if (cat_id) {
    categories = await Category.find({
      $or: [{ _id: cat_id }, { parent: cat_id }],
      isDisabled: null,
    });
    if (!categories.length) {
      return res.status(404).json({ error: "Categories not found." });
    }
  }
  let searchingFactor = {};
  if (keyword && !cat_id) {
    //that is if only with keyword
    searchingFactor.isVerified = { $ne: null };
    searchingFactor.isDeleted = null;
    searchingFactor.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { tags: { $regex: keyword, $options: "i" } },
    ];
    if (brands) searchingFactor.brand = brands;
    if (max_price && min_price)
      searchingFactor.price = { $lte: +max_price , $gte: +min_price };
    if (!max_price && min_price)
      searchingFactor.price = { $gte: +min_price };
    if (sizes) searchingFactor.size = { $in: sizes };
    if (colors) searchingFactor.color = { $in: colors };
    if (weights) searchingFactor.weight = { $in: weights };
    if (warranties) searchingFactor.warranty = warranties;
    if (ratings) searchingFactor.averageRating = { $gte: +ratings };
  } else {
    //cat_id alongwith another some factors
    searchingFactor.isVerified = { $ne: null };
    searchingFactor.isDeleted = null;
    searchingFactor.category = { $in: categories };
    if (brands) searchingFactor.brand = brands;
    if (max_price && min_price)
      searchingFactor.price = { $lte: +max_price, $gte: +min_price };
    if (sizes) searchingFactor.size = { $in: sizes };
    if (colors) searchingFactor.color = { $in: colors };
    if (weights) searchingFactor.weight = { $in: weights };
    if (warranties) searchingFactor.warranty = warranties;
    if (ratings) searchingFactor.averageRating = { $gte: +ratings };
  }
    let products = await Product.find(searchingFactor)
      .populate("category", "displayName slug")
      .populate("brand", "brandName slug")
      .populate("images", "-createdAt -updatedAt -_v")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .lean()
      .sort(sortFactor)
  let totalCount = await Product.countDocuments(searchingFactor);
  //user's action on each product
  products = products.map(async p => {
    //user's action on this product
    const { hasOnCart, hasOnWishlist } = await userHas(p, req.authUser, 'products')
    //ratings of this product
    // p.stars = await getRatingInfo(p)
    p.hasOnCart = hasOnCart,
    p.hasOnWishlist = hasOnWishlist
    return p
  })
  products = await Promise.all(products)
  res.json({ products, totalCount });
};

exports.getProductsByCategory = async (req, res) => {
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || 10;
  const {createdAt,updatedAt,price} = req.query
  let sortFactor = {createdAt:'desc'} ;
  if(createdAt && (createdAt==='asc' || createdAt==='desc')) sortFactor = {createdAt}
  if(updatedAt && (updatedAt==='asc' || updatedAt==='desc')) sortFactor = {updatedAt}
  if(price && (price==='asc' || price==='desc')) sortFactor = {price}
  let categories = await Category.find({
    $or: [{ slug: req.query.cat_slug }, { parent: req.query.cat_id }],
    isDisabled: null,
  });
  if (!categories.length) {
    return res.status(404).json({ error: "Categories not found" });
  }
  categories = categories.map((c) => c._id.toString());
  let products = await Product.find({ category: { $in: categories } })
    .populate("category", "displayName slug")
    .populate("brand", "brandName slug")
    .populate("images", "-createdAt -updatedAt -__v")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .lean()
    .sort(sortFactor);
  // if (!products.length) {
  //   return res.status(404).json({ error: "No products are available." });
  // }
  const totalCount = await Product.countDocuments({
    category: { $in: categories },
  });

  //user's action on each product
  products = products.map(async p => {
    //user's action on this product
    const { hasOnCart, hasOnWishlist } = await userHas(p, req.authUser, 'products')
    //ratings of this product
    // p.stars = await getRatingInfo(p)
    p.hasOnCart = hasOnCart,
      p.hasOnWishlist = hasOnWishlist
    return p
  })
  products = await Promise.all(products)
  res.json({ products, totalCount });
};

exports.generateFilter = async (req, res) => {
  const filterGenerate = (products) => {
    let filters = {
      sizes: [],
      brands: [],
      warranties: [],
      colors: [],
      weights: [],
      prices: [],
      ratings: [5, 4, 3, 2, 1],
    };
    products.forEach((p) => {
      if (
        !filters.brands.some((brand) => p.brand.brandName === brand.brandName)
      )
        filters.brands.push(p.brand);
      if (!filters.warranties.some((w) => p.warranty === w))
        filters.warranties.push(p.warranty);
      if (!filters.prices.some((price) => p.price === price))
        filters.prices.push(p.price);
      p.size.forEach((size) => {
        if (!filters.sizes.includes(size)) filters.sizes.push(size);
      });
      p.color.forEach((color) => {
        if (!filters.colors.includes(color)) filters.colors.push(color);
      });
      p.weight.forEach((weight) => {
        if (!filters.weights.includes(weight)) filters.weights.push(weight);
      });
    });
    //making price range =>[[min,max],[min1,max1]]7
    let min_price = Math.min(...filters.prices);
    let max_price = Math.max(...filters.prices);
    //make min max price to multiple of 100
    function minmax(min, max) {
      let M;
      let m;
      if (max < 100) M = 100;
      if (max > 100) M = max + (100 - (max % 100));
      if (max % 100 === 0) M = max + 100;
      if (min < 100) m = 0;
      if (min > 100) m = min - (min % 100);
      if (min % 100 === 0) m = min - 100;
      return [m, M];
    }
    filters.prices = minmax(min_price, max_price);
    return filters;
  };
  if (req.query.keyword) {
    // by search keyword
    let products
    let sortFactor = { createdAt: 'desc' }
    //if keyword is system keyword of latest products
    if (req.query.keyword === process.env.LATEST_PRODUCT) {
      products = await Product.find({
        isVerified: { $ne: null },
        isDeleted: null,
      })
      .limit(50)
      .sort(sortFactor)
      .populate("brand", "brandName slug")
      .select("-_id brand warranty size color weight price");
      let generatedFilters = filterGenerate(products);
      return res.json(generatedFilters);
    }
    products = await Product.find({
      $or: [
        { name: { $regex: req.query.keyword, $options: "i" } },
        { tags: { $regex: req.query.keyword, $options: "i" } },
      ],
      isVerified: { $ne: null },
      isDeleted: null,
    })
    .populate("brand", "brandName slug")
    .select("-_id brand warranty size color weight price");
    // if (!products.length) {
    //   return res.status(404).json({ error: "Cannot generate filter" });
    // }
    let generatedFilters = filterGenerate(products);
    return res.json(generatedFilters);
  } else {
    //else by category
    let categories = await Category.find({
      $or: [{ slug: req.query.cat_slug }, { parent: req.query.cat_id }],
      isDisabled: null,
    });
    if (!categories.length) {
      return res
        .status(404)
        .json({ error: "Category not found. Cannot generate filter." });
    }
    categories = categories.map((c) => c._id.toString());
    const products = await Product.find({
      category: { $in: categories },
      isVerified: { $ne: null },
      isDeleted: null,
    })
      .populate("brand", "brandName slug")
      .select("-_id brand warranty size color weight price");
    // if (!products.length) {
    //   return res.status(404).json({ error: "Cannot generate filter" });
    // }
    let generatedFilters = filterGenerate(products);
    return res.json(generatedFilters);
  }
};
