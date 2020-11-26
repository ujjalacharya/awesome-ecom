import { GLOBAL_ERROR, MULTI_PRODUCT_LOADING, GET_PRODUCTS, SINGLE_PRODUCT_LOADING, GET_PRODUCT} from "../types";
import api from "../../utils/api";

export const getProducts = (id, page, perPage, keyword = '', createdAt = '', updatedAt='' , status='',price='') => async (dispatch) => {
    try {
        dispatch({ type: MULTI_PRODUCT_LOADING })
        const res = await api.get(`/product/products/${id}?page=${page}&perPage=${perPage}&createdAt=${createdAt}&price=${price}&updatedAt=${updatedAt}&status=${status}&keyword=${keyword}`);
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data,
        });
    } catch (err) {
        console.log("****order_actions/getProducts****", err);
        dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
    }
};

export const getProduct = (product_slug) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_PRODUCT_LOADING })
        const res = await api.get(`/product/${product_slug}`);
        dispatch({
            type: GET_PRODUCT,
            payload: res.data,
        });
    } catch (err) {
        console.log("****order_actions/getProduct****", err);
        dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
    }
};