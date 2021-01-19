import { GLOBAL_ERROR, MULTI_PRODUCT_LOADING, GET_PRODUCTS, SINGLE_PRODUCT_LOADING, GET_PRODUCT, GET_CATEGORIES, GET_BRANDS, UPLOAD_IMAGES, REMOVE_IMAGE, SUCCESS, DELETE_PRODUCT, PRODUCTS_TYPES, PRODUCT_TYPES, ADD_PRODUCT_TYPES} from "../types";
import api from "../../utils/api";
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
    try {
        const formData = new FormData();
        formData.append(filename, file);
        const res = await api.post(
            action, 
            formData,
            {
                "Content-Type": "multipart/form-data",
                onUploadProgress: ({ total, loaded }) => {
                    onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
                }
            }
            );
        let images = res.data.map(image => {
            return {
                _id: image._id,
                uid: file.uid,
                name: file.name,
                status: 'done',
                url: `${process.env.REACT_APP_SERVER_URL}uploads/${image.large}`,
            }
        })
        onSuccess(images[0], file)
    } catch (err) {
        onError(err)
        console.log("****product_actions/uploadImages****", err);
        dispatch({ type: GLOBAL_ERROR, payload: err || "Error occured while uploading." });
    }
};

export const saveUploadedImages = (images) => async (dispatch) => {
    dispatch({
        type: UPLOAD_IMAGES,
        payload: images,
    });
};

export const deleteImageById = (id,image_id) => async (dispatch) => {
    const response = await productService.deleteImageById(id,image_id);
    if (response.isSuccess) {
      dispatch(success(REMOVE_IMAGE, response.data._id));
      return true
    } else if (!response.isSuccess) {
      dispatch(error(response.errorMessage));
      return false
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
    // body = JSON.stringify(body)
    // try {
    //     await api.post(`/product/${id}`,body);
    //     dispatch({
    //         type: SUCCESS,
    //         payload: 'Your product has been submitted and is under verification.',
    //     });
    // } catch (err) {
    //     console.log("****product_actions/addProduct****", err);
    //     dispatch({ type: GLOBAL_ERROR, payload: err || "Please try again." });
    // }
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

