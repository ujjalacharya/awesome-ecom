import { GET_PRODUCT, GET_PRODUCTS, MULTI_PRODUCT_LOADING, SINGLE_PRODUCT_LOADING, GET_CATEGORIES } from "../types";


const initialState = {
    product : null,
    products: [],
    multiLoading: true,
    singleLoading: true,
    totalCount: 0,
    categories:[]
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload.products,
                multiLoading: false,
                totalCount:payload.totalCount
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
                singleLoading: false
            };
        case MULTI_PRODUCT_LOADING:
            return {
            ...state,
            multiLoading: true
        }
        case SINGLE_PRODUCT_LOADING:
            return {
                ...state,
                singleLoading: true
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        default:
            return state;
    }
}
