import { CART_PRODUCTS, GLOBAL_ERROR } from "../types";
import { CartService } from "../services/cartService";

const getCartProducts = (id) => {
  return async (dispatch) => {
    const cartService = new CartService();
    const response = await cartService.getCartProducts(id);
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


export default {
    getCartProducts,
};
