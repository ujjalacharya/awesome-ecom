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
const _ = require("lodash");
const Fawn = require("fawn");
const { fileRemover, imageCompressor } = require("../middleware/helpers");
const task = Fawn.Task();

exports.product = async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.p_slug })
    .populate("images", "-createdAt -updatedAt -__v")
    .populate("soldBy", "shopName address holidayMode")
    .populate("brand")
    .populate({
      path: 'category',
      populate: {
        path: 'parent',
        model: 'category',
        populate: {
          path: 'parent',
          model: 'category'
        }
      }
    });
  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }
  req.product = product;
  next();
};
exports.getProduct = async (req, res) => {
  let role = req.authAdmin && req.authAdmin.role || 'user'
    if (role === 'user' && (!req.product.isVerified || req.product.isDeleted)){
    return res
    .status(404)
    .json({ error: "Product is not verified or has been deleted." });
    }
  if (role === 'admin' && req.product.isDeleted) {
    return res
      .status(404)
      .json({ error: "Product has been deleted." });
  }
  //increament viewCount
  // !req.authAdmin && (req.product.viewsCount += 1)
  if (role === 'user') {
    req.product.viewsCount += 1
  }
  await req.product.save()
  //ratings of this product
  const product = req.product.toObject()
  product.stars = await getRatingInfo(req.product)
  //user's action on this product
  if (req.authUser) {
    
    const { hasBought, hasOnCart, hasOnWishlist, hasReviewed } = await userHas(req.product, req.authUser, 'product')
    product.hasOnCart = hasOnCart
    product.hasBought = hasBought
    product.hasOnWishlist = hasOnWishlist
    product.hasReviewed = hasReviewed
  }
  res.json({ product });
};


exports.createProduct = async (req, res) => {
  if (!req.profile.isVerified)
    return res.status(403).json({ error: "Admin is not verified" });
  if (req.admin.role!== 'superadmin') {
    req.body.isFeatured = undefined
    req.body.isVerified = undefined
  }
  if (req.admin.role === 'superadmin') {
    if (req.body.isFeatured) {
      
      req.body.isFeatured = Date.now()
    }
    req.body.isVerified = Date.now()
  }
  let newProduct = new Product(req.body);
  newProduct.soldBy = req.profile._id;
  // save the product
  // with linking product to product images
  req.images.forEach(i =>{
    let updataImage = i.toObject()
    updataImage.productLink = newProduct._id
    task
    .update(i, updataImage)
    .options({ viaSave: true })
  })
  await task
    .save(newProduct)
    .run({ useMongoose: true });

  return res.json(newProduct);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.p_slug });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  product.isDeleted = Date.now();
  product.isVerified = null
  product.isFeatured = null
  product.isRejected = null
  await product.save();
  // this.getProducts(req,res)
  res.json(product);
};

exports.productImages = async (req, res) => {
  if (!req.files.length) {
    return res.status(400).json({ error: "Product images are required" });
  }
  let files = []
  if (!req.profile.isVerified) {
    files = req.files.map(({filename}) => `public/uploads/${filename}`)
    fileRemover(files)    
    return res.status(403).json({ error: "Admin is not verified" });
  }
  let images = req.files.map(async (file) => {
    const image = new ProductImages();
    const { filename, path: filepath, destination } = file;
    image.thumbnail = await imageCompressor(
      filename,
      80,
      filepath,
      destination,
      "productThumbnail"
    );
    image.medium = await imageCompressor(
      filename,
      540,
      filepath,
      destination,
      "productMedium"
    );
    image.large = await imageCompressor(
      filename,
      800,
      filepath,
      destination,
      "productLarge"
    );
    // image.large = `productLarge/${filename}`
    // image.thumbnail = `productThumbnail/${filename}`
    // image.medium = `productMedium/${filename}`
    // remove image from public/uploads
    const Path = `public/uploads/${filename}`;
    files.push(Path)
    // fs.unlinkSync(Path);
    return await image.save();
    // return image
  });
  images = await Promise.all(images);
  fileRemover(files)
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
  let files = [`public/uploads/${imageFound.thumbnail}`, `public/uploads/${imageFound.medium}`, `public/uploads/${imageFound.large}`]
  fileRemover(files)
  // let Path = `public/uploads/${imageFound.thumbnail}`;
  // fs.unlinkSync(Path);
  // Path = `public/uploads/${imageFound.medium}`;
  // fs.unlinkSync(Path);
  // Path = `public/uploads/${imageFound.large}`;
  // fs.unlinkSync(Path);
  res.json(updateProduct.images);
};

exports.deleteImageById = async (req, res) => {
  let image = await ProductImages.findByIdAndRemove(req.query.image_id);
  let files = [`public/uploads/${image.thumbnail}`, `public/uploads/${image.medium}`, `public/uploads/${image.large}`]
  fileRemover(files)
  // let Path = `public/uploads/${image.thumbnail}`;
  // fs.unlinkSync(Path);
  // Path = `public/uploads/${image.medium}`;
  // fs.unlinkSync(Path);
  // Path = `public/uploads/${image.large}`;
  // fs.unlinkSync(Path);
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
  product.isRejected = null
  await product.save();
  res.json(product);
};

exports.getProducts = async (req, res) => {
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || 10;
  const { createdAt, updatedAt, price, status, keyword, outofstock } = req.query

  let sortFactor = { createdAt: 'desc' };
  if (createdAt && (createdAt === 'asc' || createdAt === 'desc')) sortFactor = { ...sortFactor, createdAt }
  if (updatedAt && (updatedAt === 'asc' || updatedAt === 'desc')) sortFactor = { ...sortFactor, updatedAt }
  if (price && (price === 'asc' || price === 'desc')) sortFactor = { price: price === 'asc' ? 1 : -1 }
  let query = { soldBy: req.profile._id, isDeleted: null }
  if (keyword) query = {
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
  if (status && status === 'rejected') query = {
    ...query,
    isRejected: { $ne: null }
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
    quantity: 0
  }
  let products = await Product.find(query)
    .populate("category", "displayName slug")
    .populate("brand", "brandName slug")
    .populate("images", "-createdAt -updatedAt -__v")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .lean()
    .sort(sortFactor);
  // if (price && (price === 'asc' || price === 'desc')) {
  //     products.sort((a, b) => {
  //       return price === 'asc' ? parseFloat(a.price) - parseFloat(b.price) : parseFloat(b.price) - parseFloat(a.price)
  //     })
  //   }
  //rating on each product
  // products = products.map(async p => {
  //   p.stars = await getRatingInfo(p)
  //   return p
  // })
  // products = await Promise.all(products)
  const totalCount = await Product.countDocuments(query);
  res.json({ products, totalCount });
};

exports.minedProducts = async (req, res) => {
  let page = +req.query.page || 1;
  let perPage = +req.query.perPage || 10;
  let sortFactor
  let query = {
    isVerified: { $ne: null },
    isDeleted: null,
  }
  if (req.header('district')) {
    query = {
      ...query,
      availableDistricts: { $in: req.header('district')}
    }
  }
  if (req.query.keyword === 'latest') {
    sortFactor = { createdAt: 'desc' }
  }
  else if (req.query.keyword === 'featured') {
    sortFactor = { createdAt: 'desc' }
    query = {
      ...query,
      isFeatured: { $ne: null }
    }
  }
  else if (req.query.keyword === 'trending') {
    sortFactor = { trendingScore: -1 }
  }
  else if (req.query.keyword === 'mostviewed') {
    sortFactor = { viewsCount: -1 }
  } 
  else if (req.query.keyword === 'topselling') {
    sortFactor = { noOfSoldOut: -1 }
  } 
  else {
    return res.status(403).json({error: "Invalid keyword."})
  }
  let products = await Product.find(query)
    .populate("category", "displayName slug")
    .populate("brand", "brandName slug")
    .populate("images", "-createdAt -updatedAt -__v")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .lean()
    .sort(sortFactor);

  let totalCount = await Product.countDocuments(query)
  // if (totalCount > 50) totalCount = 50
  //user's action on each product
  if (req.authUser) {
    
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
  }
  res.json({ products, totalCount });
};
exports.forYouProducts = async (req,res) => {
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || 10;
  const { createdAt, updatedAt, price } = req.query
  let sortFactor = { createdAt: 'desc' };
  if (createdAt && (createdAt === 'asc' || createdAt === 'desc')) sortFactor = { createdAt }
  if (updatedAt && (updatedAt === 'asc' || updatedAt === 'desc')) sortFactor = { updatedAt }
  if (price && (price === 'asc' || price === 'desc')) sortFactor = { price: price === 'asc' ? 1 : -1 }
  const orders = await Order.find({ user: req.user._id })
    .select('-_id product')
    .populate({
      path: 'product',
      select: '-_id category',
      populate: {
        path: 'category',
        model: 'category',
        select: '_id ',
        match: {
          isDisabled: null
        },
        populate: {
          path: 'parent',
          model: 'category',
          select: '_id ',
          match: {
            isDisabled: null
          },
          populate: {
            path: 'parent',
            model: 'category',
            select: '_id ',
            match: {
              isDisabled: null
            },
          }
        }
      }
    });
    let categories = []
    orders.forEach(o=>{
      o.product.category.forEach(cat=>{
        categories.push(cat._id)//i.e last layer
        cat.parent && categories.push(cat.parent._id) //i.e second layer
        // cat.parent.parent && categories.push(cat.parent.parent._id) //i.e first layer
      })
    })
  categories =[... new Set(categories)]
  if (!categories.length) {
    return res.status(403).json({ error: "Categories not found." });
  }

  let query = { category: { $in: categories } }
  if (req.header('district')) {
    query = {
      ...query,
      availableDistricts: { $in: req.header('district') }
    }
  }
  
  let products = await Product.find(query)
    .populate("category", "displayName slug")
    .populate("brand", "brandName slug")
    .populate("images", "-createdAt -updatedAt -__v")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .lean()
    .sort(sortFactor);
  const totalCount = await Product.countDocuments(query);

  //user's action on each product
  
  products = products.map(async p => {
    //user's action on this product
    const { hasOnCart, hasOnWishlist } = await userHas(p, req.user, 'products')
    //ratings of this product
    // p.stars = await getRatingInfo(p)
    p.hasOnCart = hasOnCart,
      p.hasOnWishlist = hasOnWishlist
    return p
  })
  products = await Promise.all(products)
  res.json({ products, totalCount });
}

exports.suggestKeywords = async (req, res) => {
  let limits = +req.query.limits || 5
  let suggestedKeywords = await SuggestKeywords
    .find({ keyword: { $regex: req.query.keyword || '', $options: "i" }, isDeleted: null })
    .select('-_id keyword')
    .limit(limits)
  suggestedKeywords = suggestedKeywords.map(s => s.keyword)
  res.json(suggestedKeywords)
}

exports.searchProducts = async (req, res) => {
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || 10;
  const { createdAt, updatedAt, price } = req.query
  let sortFactor = { createdAt: 'desc' };
  if (createdAt && (createdAt === 'asc' || createdAt === 'desc')) sortFactor = { createdAt }
  if (updatedAt && (updatedAt === 'asc' || updatedAt === 'desc')) sortFactor = { updatedAt }
  if (price && (price === 'asc' || price === 'desc')) sortFactor = { price:price==='asc' ? 1 : -1 }
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
      searchingFactor.price = { $lte: +max_price, $gte: +min_price };
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
  if (req.header('district')) {
      searchingFactor.availableDistricts = { $in: req.header('district') }
  }
  let products = await Product.find(searchingFactor)
    .populate("category", "displayName slug")
    .populate("brand", "brandName slug")
    .populate("images", "-createdAt -updatedAt -_v")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .lean()
    .sort(sortFactor)
  // if (price && (price === 'asc' || price === 'desc')) {
  //   products.sort((a, b) => {
  //     return price === 'asc' ? parseFloat(a.price) - parseFloat(b.price) : parseFloat(b.price) - parseFloat(a.price)
  //   })
  // }
  let totalCount = await Product.countDocuments(searchingFactor);
  //user's action on each product
  if (req.authUser) {
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
  }
  res.json({ products, totalCount });
};

exports.getProductsByCategory = async (req, res) => {
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || 10;
  const { createdAt, updatedAt, price } = req.query
  let sortFactor = { createdAt: 'desc' };
  if (createdAt && (createdAt === 'asc' || createdAt === 'desc')) sortFactor = { createdAt }
  if (updatedAt && (updatedAt === 'asc' || updatedAt === 'desc')) sortFactor = { updatedAt }
  if (price && (price === 'asc' || price === 'desc')) sortFactor = { price: price === 'asc' ? 1 : -1 }
  let categories = await Category.find({
    $or: [{ slug: req.query.cat_slug }, { parent: req.query.cat_id }],
    isDisabled: null,
  });
  if (!categories.length) {
    return res.status(404).json({ error: "Categories not found" });
  }
  let query = {
    category: { $in: categories },
    isVerified: { $ne: null },
    isDeleted: null
  }
  if (req.header('district')) {
    query = {
      ...query,
      availableDistricts: { $in: req.header('district') }
    }
  }
  categories = categories.map((c) => c._id.toString());
  let products = await Product.find(query)
    .populate("category", "displayName slug")
    .populate("brand", "brandName slug")
    .populate("images", "-createdAt -updatedAt -__v")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .lean()
    .sort(sortFactor);
    // if (price && (price === 'asc' || price === 'desc')) {
    //   products.sort((a, b) => {
    //     return price === 'asc' ? parseFloat(a.price) - parseFloat(b.price) : parseFloat(b.price) - parseFloat(a.price)
    //   })
    // }
  // if (!products.length) {
  //   return res.status(404).json({ error: "No products are available." });
  // }
  const totalCount = await Product.countDocuments(query);

  //user's action on each product
  if (req.authUser) {
    
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
  }
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
    if (req.query.keyword === 'latest') {
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
