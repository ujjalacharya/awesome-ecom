import { GET_CATEGORIES, GET_BRANDS, UPLOAD_IMAGES, REMOVE_IMAGE, REMOVE_UPLOAD_IMAGES, SUCCESS, PRODUCTS_TYPES, PRODUCT_TYPES, ADD_PRODUCT_TYPES} from "../types";
import { finish, init, success, error } from "../commonActions";
import { ProductService } from "../api/product_api";

const productService = new ProductService();

export const getProducts = ({id, page, perPage, keyword , createdAt , updatedAt , status,price, outofstock}) => async (dispatch) => {
    dispatch(init(PRODUCTS_TYPES.GET_PRODUCTS));

  const response = await productService.getProducts({id, page, perPage, keyword , createdAt , updatedAt , status,price, outofstock});

  dispatch(finish(PRODUCTS_TYPES.GET_PRODUCTS));

  if (response.isSuccess) {
    dispatch(success(PRODUCTS_TYPES.GET_PRODUCTS, response.data));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const getProduct = (product_slug) => async (dispatch) => {
    dispatch(init(PRODUCT_TYPES.GET_PRODUCT));

  const response = await productService.getProduct(product_slug);

  dispatch(finish(PRODUCT_TYPES.GET_PRODUCT));

  if (response.isSuccess) {
    dispatch(success(PRODUCT_TYPES.GET_PRODUCT, response.data.product));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const getCategories = () => async (dispatch) => {
  const response = await productService.getCategories();

  if (response.isSuccess) {
    let categories = response.data.categories
    const getChildCategories = (allCategories, parentCategory) => {
        let newParentCate = [];
        parentCategory.forEach((parentCate) => {
            let parentCategoryElements = { ...parentCate };
            let childCate = [];
            allCategories.forEach((allCate) => {
                if (allCate.parent === parentCate._id) {
                    childCate.push(allCate);
                }
            });
            parentCategoryElements.childCate = childCate;
            newParentCate.push(parentCategoryElements);
        });
        return newParentCate;
    };
    let parentCategory = [];
    let parentCate = [];

    categories.map((cate) => {
        if (cate.parent === undefined) {
            parentCategory.push(cate);
        }
    });

    let allCates = getChildCategories(categories, parentCategory);

    allCates.map((newChild) => {
        let newallCates = getChildCategories(categories, newChild.childCate);
        let parentCateEle = { ...newChild, childCate: newallCates };
        parentCate.push(parentCateEle);
    });

    dispatch(success(GET_CATEGORIES, parentCate));

  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));    
  }
};

export const getBrands = () => async (dispatch) => {
    const response = await productService.getBrands();
    if (response.isSuccess) {
      dispatch(success(GET_BRANDS, response.data));
    } else if (!response.isSuccess) {
      dispatch(error(response.errorMessage));
    }
};

export const uploadImages = ({
    action,
    file,
    filename,
    onError,
    onProgress,
    onSuccess,
  }) => async (dispatch) => {
    const body = new FormData();
    body.append(filename, file);
    const response = await productService.uploadImages(action, body, file, onProgress);

    if (response.isSuccess) {
      console.log(response);
      let images = response.data.map(image => {
        return {
          _id: image._id,
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: `${process.env.REACT_APP_SERVER_URL}uploads/${image.large}`,
        }
      })
      onSuccess(images[0], file)
    } else if (!response.isSuccess) {
      onError(response)
      dispatch(error(response.errorMessage));
    }
};

export const saveUploadedImages = (images) => async (dispatch) => {
  dispatch(success(UPLOAD_IMAGES, images));
};

export const removeUploadedImages = () => async (dispatch) => {
  dispatch({type: REMOVE_UPLOAD_IMAGES});
};

export const deleteImageById = (id,image_id) => async (dispatch) => {
    const response = await productService.deleteImageById(id,image_id);
    if (response.isSuccess) {
      dispatch(success(REMOVE_IMAGE, response.data._id));
      return true
    } else if (!response.isSuccess) {
      dispatch(error(response.errorMessage));
      return true
    }
};


export const addProduct = (productData) => async (dispatch) => {
    dispatch(init(ADD_PRODUCT_TYPES.ADD_PRODUCT));

  const response = await productService.addProduct(productData);

  dispatch(finish(ADD_PRODUCT_TYPES.ADD_PRODUCT));

  if (response.isSuccess) {
    dispatch(success(SUCCESS, 'Your product has been submitted and is under verification.'))
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const updateProduct = (productData, deletedProductImages) => async (dispatch) => {
  let errors = []
  if (deletedProductImages.length) {
    deletedProductImages = deletedProductImages.map(async img => {
      if (!img.isLinkedWithProduct) {
        const deleteImgRes = await productService.deleteImageById(productData.id, img._id);
        if (!deleteImgRes.isSuccess) {
          errors.push("Error occurs while updating product.1")
        }
      }
      if (img.isLinkedWithProduct) {
        const deleteImgRes = await productService.deleteProductImage(productData.id, img.isLinkedWithProduct, img._id);
        if (!deleteImgRes.isSuccess) {
          errors.push("Error occurs while updating product.2")
        }
      }
      return img
    })
    await Promise.all(deletedProductImages)

  }
  if (errors.length) {
    dispatch(error(errors[0]))
  } else {

    dispatch(init(ADD_PRODUCT_TYPES.ADD_PRODUCT));
  
    const response = await productService.updateProduct(productData);
  
    dispatch(finish(ADD_PRODUCT_TYPES.ADD_PRODUCT));
  
    if (response.isSuccess) {
      dispatch(success(SUCCESS, 'Your product has been submitted and is under verification.'))
    } else if (!response.isSuccess) {
      dispatch(error(response.errorMessage));
    }
  }
};

export const deleteProduct = (id, slug) => async (dispatch) => {
    dispatch(init(PRODUCTS_TYPES.GET_PRODUCTS));

  const response = await productService.deleteProduct(id, slug);

  dispatch(finish(PRODUCTS_TYPES.GET_PRODUCTS));

  if (response.isSuccess) {
    dispatch(success(SUCCESS, 'Your product has been deleted successfully.'))
    dispatch(getProducts({id}));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

