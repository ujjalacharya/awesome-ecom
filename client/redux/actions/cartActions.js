import {
  CART_PRODUCTS,
  GLOBAL_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EDIT_CART_QTY,
  CART_START,
  CART_FINISH
} from "../types";
import { CartService } from "../services/cartService";
import { getDiscountedPrice, openNotification } from "../../utils/common";

const getCartProducts = (query, ctx) => {
  return async (dispatch) => {
    const cartService = new CartService();
    const response = await cartService.getCartProducts(query, ctx);
    if (response.isSuccess) {
      let noStockCarts = [];
      let inStockCarts = [];
      response.data.carts.map((item, i) => {
        if (item.product.quantity === 0) {
          noStockCarts.push(item);
        } else {
          inStockCarts.push(item);
        }
      });

      let inStockCartsTotalAmount = 0;
      inStockCarts.map((item, i) => {
        inStockCartsTotalAmount += getDiscountedPrice(
          item.product.price.$numberDecimal,
          item.product.discountRate
        );
      });

      let noStockCartsTotalAmount = 0;
      noStockCarts.map((item, i) => {
        noStockCartsTotalAmount += getDiscountedPrice(
          item.product.price.$numberDecimal,
          item.product.discountRate
        );
      });

      let noStockProducts = {
        carts: noStockCarts,
        totalCount: noStockCarts.length,
        totalAmount: noStockCartsTotalAmount,
      };

      let inStockProducts = {
        carts: inStockCarts,
        totalCount: inStockCarts.length,
        totalAmount: inStockCartsTotalAmount,
      };
      dispatch({
        type: CART_PRODUCTS,
        payload: { ...response.data, noStockProducts, inStockProducts },
      });
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
    await dispatch({ type: CART_START });
    const cartService = new CartService();
    const response = await cartService.addToCart(query, body);
    await dispatch({ type: CART_FINISH });
    if (response.isSuccess) {
      openNotification("Success", "Product added to cart successfully");
      dispatch({ type: ADD_TO_CART, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const removeCart = (query) => {
  return async (dispatch) => {
    await dispatch({ type: CART_START });
    const cartService = new CartService();
    const response = await cartService.removeCart(query);
    await dispatch({ type: CART_FINISH });
    if (response.isSuccess) {
      openNotification("Success", "Product removed from cart successfully");
      dispatch({ type: REMOVE_FROM_CART, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const editCartQty = (query) => {
  return async (dispatch) => {
    const cartService = new CartService();
    const response = await cartService.editCartQty(query);
    if (response.isSuccess) {
      dispatch({ type: EDIT_CART_QTY, payload: response.data });
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
  addToCart,
  removeCart,
  editCartQty,
};
