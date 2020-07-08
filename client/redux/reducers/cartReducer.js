import { CART_PRODUCTS, ADD_TO_CART } from "../types";

const initialState = {
  getCartProducts: null,
  addToCartResp: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CART_PRODUCTS:
      return { ...state, getCartProducts: action.payload, hasError: false };
    case ADD_TO_CART:
      return { ...state, addToCartResp: action.payload, hasError: false };
    default:
      return state;
  }
};
