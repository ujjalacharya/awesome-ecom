import { myCartsSkeleton } from "../../utils/skeletons";
import {
  CART_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EDIT_CART_QTY,
  STORE_CHECKOUT_ITEMS,
  STORE_CART_ITEMS,
  CART_START,
  CART_FINISH,
} from "../types";

const initialState = {
  getCartProducts: null,
  addToCartResp: null,
  removeFromCartResp: null,
  editCartQtyResp: null,
  checkoutItems: null,
  directBuyItems: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CART_START:
      return { ...state, loading: true, getCartProducts: myCartsSkeleton, hasError: false };
    case CART_FINISH:
      return { ...state, loading: false, hasError: false };
    case CART_PRODUCTS:
      return { ...state, getCartProducts: action.payload, hasError: false };
    case ADD_TO_CART:
      return { ...state, addToCartResp: action.payload, hasError: false };
    case REMOVE_FROM_CART:
      return { ...state, removeFromCartResp: action.payload, hasError: false };
    case EDIT_CART_QTY:
      return { ...state, editCartQtyResp: action.payload, hasError: false };
    case STORE_CHECKOUT_ITEMS:
      return { ...state, checkoutItems: action.payload, hasError: false };
    case STORE_CART_ITEMS:
      return { ...state, directBuyItems: action.payload, hasError: false };
    default:
      return state;
  }
};
