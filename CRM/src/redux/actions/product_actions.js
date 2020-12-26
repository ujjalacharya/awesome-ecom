import { GLOBAL_ERROR, MULTI_PRODUCT_LOADING, GET_PRODUCTS, SINGLE_PRODUCT_LOADING, GET_PRODUCT, GET_CATEGORIES, GET_BRANDS, UPLOAD_IMAGES, REMOVE_IMAGE, REMOVING_IMAGE} from "../types";
import api from "../../utils/api";

export const getProducts = ({id, page, perPage, keyword = '', createdAt = '', updatedAt='' , status='',price='', outofstock=''}) => async (dispatch) => {
    try {
        dispatch({ type: MULTI_PRODUCT_LOADING })
        const res = await api.get(`/product/products/${id}?page=${page}&perPage=${perPage}&createdAt=${createdAt}&price=${price}&updatedAt=${updatedAt}&status=${status}&keyword=${keyword}&outofstock=${outofstock}`);
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data,
        });
    } catch (err) {
        console.log("****product_actions/getProducts****", err);
        dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
    }
};

export const getProduct = (product_slug) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_PRODUCT_LOADING })
        const res = await api.get(`/product/${product_slug}`);
        dispatch({
            type: GET_PRODUCT,
            payload: res.data.product,
        });
    } catch (err) {
        console.log("****product_actions/getProduct****", err);
        dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
    }
};

export const getCategories = () => async (dispatch) => {
    try {
        const res = await api.get(`/superadmin/product-categories`);
        let categories = res.data.categories

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

        dispatch({
            type: GET_CATEGORIES,
            payload: parentCate,
        });
    } catch (err) {
        console.log("****product_actions/getCategories****", err);
        dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
    }
};

export const getBrands = () => async (dispatch) => {
    try {
        const res = await api.get(`/superadmin/product-brands`);
        dispatch({
            type: GET_BRANDS,
            payload: res.data,
        });
    } catch (err) {
        console.log("****product_actions/getBrands****", err);
        dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
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
        let data = res.data.map(image=>image._id)
        dispatch({
            type: UPLOAD_IMAGES,
            payload: data,
        });
        onSuccess(res, file)
    } catch (err) {
        onError(err)
        console.log("****product_actions/uploadImages****", err);
        dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
    }
};

export const deleteImageById = (id,image_id) => async (dispatch) => {
    try {
        dispatch({type: REMOVING_IMAGE})
        const res = await api.delete(`/product/image/${id}?image_id=${image_id}`);
        dispatch({
            type: REMOVE_IMAGE,
            payload: res.data._id,
        });
        return true
    } catch (err) {
        console.log("****product_actions/deleteImageById****", err);
        dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
        return false
    }
};