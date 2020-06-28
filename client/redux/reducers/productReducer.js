import { LATEST_PRODUCTS, PRODUCT_DETAILS } from "../types";

const initialState = {
  latestProducts: null,
  productDetails: null,
  orders: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LATEST_PRODUCTS:
      return { ...state, latestProducts: action.payload };
      case PRODUCT_DETAILS:
        return {...state, productDetails: action.payload };
      case "check":
        return {...state, orders: action.payload };
    default:
      return state;
  }
};
