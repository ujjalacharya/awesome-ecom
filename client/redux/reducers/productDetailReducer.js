import { LATEST_PRODUCTS, PRODUCT_DETAILS } from "../types";

const initialState = {
  productDetails: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS:
      return { productDetails: action.payload };
    default:
      return state;
  }
};
