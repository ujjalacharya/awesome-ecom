import Router from "next/router";
import fetch from "isomorphic-unfetch";
import {
  LATEST_PRODUCTS,
  MENU_CATEGORIES,
  PRODUCT_DETAILS,
  PRODUCT_BY_CATEGORY,
  PRODUCT_ERROR,
} from "../types";
import { setCookie, removeCookie, getCookie } from "../../utils/cookie";
import { ProductService } from "../services/productService";

const productCategories = () => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.productCategories();
    if (response.isSuccess) {
      dispatch({ type: MENU_CATEGORIES, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getLatestProducts = () => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.getLatestProducts();
    if (response.isSuccess) {
      dispatch({ type: LATEST_PRODUCTS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getProductDetails = (slug) => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.getProductDetails();
    if (response.isSuccess) {
      dispatch({ type: PRODUCT_DETAILS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getProductsByCategory = (query) => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.getProductsByCategory();
    if (response.isSuccess) {
      dispatch({ type: PRODUCT_BY_CATEGORY, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getOrders = (ctx) => {
  return async (dispatch) => {
    const resp = await fetch(
      `${process.env.SERVER_BASE_URL}/api/cart-wishlist/carts?page=1`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": getCookie("token", ctx),
        },
      }
    );
    const data = await resp.json();

    dispatch({ type: "check", payload: data });

    return data;
  };
};

export default {
  getLatestProducts,
  productCategories,
  getProductDetails,
  getOrders,
  getProductsByCategory
};
