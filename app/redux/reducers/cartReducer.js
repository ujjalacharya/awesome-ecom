import {
  CART_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EDIT_CART_QTY,
  STORE_CHECKOUT_ITEMS,
} from "../types";

const initialState = {
  getCartProductsResponse: null,
  addToCartResp: null,
  removeFromCartResp: null,
  editCartQtyResp: null,
  checkoutItems: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CART_PRODUCTS:
      return { ...state, getCartProductsResponse: action.payload, hasError: false };
    case ADD_TO_CART:
      return { ...state, addToCartResp: action.payload, hasError: false };
    case REMOVE_FROM_CART:
      return { ...state, removeFromCartResp: action.payload, hasError: false };
    case EDIT_CART_QTY:
     const updatedCartProductsResponse = state.getCartProductsResponse?.carts.map(cart => {
        if(cart._id === action.payload._id){
          return {
            ...cart, quantity: action.payload.quantity
          }
        }
        return cart
      })
      return { ...state, editCartQtyResp: action.payload, hasError: false, getCartProductsResponse: {
        ...state.getCartProductsResponse, carts: updatedCartProductsResponse
      } };
    case STORE_CHECKOUT_ITEMS:
      return { ...state, checkoutItems: action.payload, hasError: false };
    default:
      return state;
  }
};
