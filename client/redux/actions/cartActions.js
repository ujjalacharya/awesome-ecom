import {
  CART_PRODUCTS,
  GLOBAL_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EDIT_CART_QTY,
  CART_START,
  CART_FINISH,
  TRENDING_PRODUCTS,
  LATEST_PRODUCTS,
  TOP_SELLING_PRODUCTS,
  MOST_VIEWED_PRODUCTS,
  FEATURED_PRODUCTS
} from "../types";
import { CartService } from "../services/cartService";
import { getDiscountedPrice, openNotification } from "../../utils/common";
import { ProductService } from "../services/productService";

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

const addToCart = (query, body, sliderName) => {
  return async (dispatch) => {
    await dispatch({ type: CART_START });
    const cartService = new CartService();
    const response = await cartService.addToCart(query, body);
    await dispatch({ type: CART_FINISH });
    if (response.isSuccess) {
      if (sliderName) {
        const productService = new ProductService();
        const prodResponse = await productService.getMinedProducts('', sliderName);
        switch (sliderName) {
          case 'trending':
            dispatch({ type: TRENDING_PRODUCTS, payload: prodResponse.data });
            break;
          case 'latest':
            dispatch({ type: LATEST_PRODUCTS, payload: prodResponse.data });
            break;
          case 'topselling':
            dispatch({ type: TOP_SELLING_PRODUCTS, payload: prodResponse.data });
            break;
          case 'mostviewed':
            dispatch({ type: MOST_VIEWED_PRODUCTS, payload: prodResponse.data });
            break;
          case 'featured':
            dispatch({ type: FEATURED_PRODUCTS, payload: prodResponse.data });
            break;
        }
      }
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

const removeCart = (query, sliderName) => {
  return async (dispatch) => {
    await dispatch({ type: CART_START });
    const cartService = new CartService();
    const response = await cartService.removeCart(query);
    await dispatch({ type: CART_FINISH });
    if (response.isSuccess) {
      if (sliderName) {
        const productService = new ProductService();
        const prodResponse = await productService.getMinedProducts('', sliderName);
        switch (sliderName) {
          case 'trending':
            dispatch({ type: TRENDING_PRODUCTS, payload: prodResponse.data });
            break;
          case 'latest':
            dispatch({ type: LATEST_PRODUCTS, payload: prodResponse.data });
            break;
          case 'topselling':
            dispatch({ type: TOP_SELLING_PRODUCTS, payload: prodResponse.data });
            break;
          case 'mostviewed':
            dispatch({ type: MOST_VIEWED_PRODUCTS, payload: prodResponse.data });
            break;
          case 'featured':
            dispatch({ type: FEATURED_PRODUCTS, payload: prodResponse.data });
            break;
        }
      }
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
