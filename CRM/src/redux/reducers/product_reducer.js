import { GET_PRODUCT, GET_PRODUCTS, MULTI_PRODUCT_LOADING, SINGLE_PRODUCT_LOADING, GET_CATEGORIES, GET_BRANDS, UPLOAD_IMAGES, REMOVE_IMAGE , DELETE_PRODUCT, PRODUCTS_TYPES, PRODUCT_TYPES, ADD_PRODUCT_TYPES} from "../types";


const initialState = {
    product : null,
    products: [],
    multiLoading: true,
    singleLoading: true,
    totalCount: 0,
    categories:[],
    brands:[],
    uploadedImages:[],
    addProductLoading: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case PRODUCTS_TYPES.GET_PRODUCTS:
            return {
                ...state,
                products: payload.products,
                totalCount:payload.totalCount
            };
        case PRODUCT_TYPES.GET_PRODUCT:
            return {
                ...state,
                product: payload,
            };
        case ADD_PRODUCT_TYPES.ADD_PRODUCT_INIT:
            return {
            ...state,
            addProductLoading: true
        }
        case ADD_PRODUCT_TYPES.ADD_PRODUCT_FINISH:
            return {
            ...state,
            addProductLoading: false
        }
        case PRODUCTS_TYPES.GET_PRODUCTS_INIT:
            return {
            ...state,
            multiLoading: true
        }
        case PRODUCTS_TYPES.GET_PRODUCTS_FINISH:
            return {
            ...state,
            multiLoading: false
        }
        case PRODUCT_TYPES.GET_PRODUCT_INIT:
            return {
            ...state,
            singleLoading: true,
            product: null
        }
        case PRODUCT_TYPES.GET_PRODUCT_FINISH:
            return {
            ...state,
            singleLoading: false
        }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        case GET_BRANDS:
            return {
                ...state,
                brands: payload
            }
        case UPLOAD_IMAGES:
            return {
                ...state,
                uploadedImages: payload,
            }
        case REMOVE_IMAGE:
            return {
                ...state,
                uploadedImages: state.uploadedImages.filter(image=>image!==payload),
            }
        default:
            return state;
    }
}
