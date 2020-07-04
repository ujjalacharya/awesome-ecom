import {
  LATEST_PRODUCTS,
  PRODUCT_DETAILS,
  PRODUCT_ERROR,
  LATEST_LOADING,
} from "../types";

const initialState = {
  latestProducts: null,
  productDetails: null,
  hasError: false,
  latestLoading: false,
};

export default (state = initialState, action) => {
  
  switch (action.type) {
    case LATEST_PRODUCTS:
      return {
        ...state,
        latestProducts: action.payload,
        hasError: false,
        latestLoading: false,
      };
    case LATEST_LOADING:
      return {
        ...state,
        latestProducts: action.payload,
        latestLoading: true,
        hasError: false,
      };
    case PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload, hasError: false };
    case PRODUCT_ERROR:
      return {
        ...state,
        productError: action.payload,
        hasError: true,
        latestLoading: false,
      };
    default:
      return state;
  }
};
