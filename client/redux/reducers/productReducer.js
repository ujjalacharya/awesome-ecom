import { LATEST_PRODUCTS, PRODUCT_DETAILS, PRODUCT_ERROR } from "../types";

const initialState = {
  latestProducts: null,
  productDetails: null,
  hasError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LATEST_PRODUCTS:
      return { ...state, latestProducts: action.payload, hasError: false };
      case PRODUCT_DETAILS:
        return {...state, productDetails: action.payload, hasError: false };
      case PRODUCT_ERROR:
        return {...state, productError: action.payload, hasError: true };
    default:
      return state;
  }
};
