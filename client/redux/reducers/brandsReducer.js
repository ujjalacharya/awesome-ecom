import { LATEST_PRODUCTS, PRODUCT_DETAILS, GET_BRANDS } from "../types";

const initialState = {
  getAllBrands: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BRANDS:
      return { getAllBrands: action.payload };
    default:
      return state;
  }
};
