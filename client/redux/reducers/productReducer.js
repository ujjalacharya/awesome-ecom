import { LATEST_PRODUCTS, PRODUCT_DETAILS } from "../types";

const initialState = {
  latestProducts: null,
  productDetails: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS:
      return { productDetails: action.payload };
    case LATEST_PRODUCTS:
      return { latestProducts: action.payload };
    default:
      return state;
  }
};
