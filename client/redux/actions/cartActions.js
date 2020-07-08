import { CART_PRODUCTS, GLOBAL_ERROR, ADD_TO_CART } from "../types";
import { CartService } from "../services/cartService";

const getCartProducts = (query, ctx) => {
  return async (dispatch) => {
    const cartService = new CartService();
    const response = await cartService.getCartProducts(query, ctx);
    if (response.isSuccess) {
      dispatch({ type: CART_PRODUCTS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const addToCart = (query, body) => {
  return async (dispatch) => {
    const cartService = new CartService();
    const response = await cartService.addToCart(query, body);
    if (response.isSuccess) {
      dispatch({ type: ADD_TO_CART, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};


export default {
    getCartProducts,
    addToCart
};
