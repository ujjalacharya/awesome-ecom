import { GLOBAL_ERROR, MULTI_PRODUCT_LOADING, GET_PRODUCTS, SINGLE_PRODUCT_LOADING, GET_PRODUCT, GET_CATEGORIES} from "../types";
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