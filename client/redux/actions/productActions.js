import Router from "next/router";
import fetch from "isomorphic-unfetch";
import { LATEST_PRODUCTS, MENU_CATEGORIES, PRODUCT_DETAILS, SEARCH_PRODUCTS } from "../types";
import { setCookie, removeCookie } from "../../utils/cookie";

const productCategories = () => {
  return async (dispatch) => {
    const resp = await fetch(
      "http://localhost:3001/api/superadmin/product-categories"
    );

    const data = await resp.json();

    dispatch({ type: MENU_CATEGORIES, payload: data });
    
    return data;
  };
};

const getLatestProducts = () => {
  return async (dispatch) => {
    const resp = await fetch("http://localhost:3001/api/product/latest");

    const data = await resp.json();

    dispatch({ type: LATEST_PRODUCTS, payload: data });

    return data;
  };
};

const getProductDetails = (slug) => {
  return async (dispatch) => {
    const resp = await fetch(`http://localhost:3001/api/product/${slug}`);

    const data = await resp.json();

    dispatch({ type: PRODUCT_DETAILS, payload: data });
    
    return data;
  };
};

const getProductBrands = () => {
  return async (dispatch) => {
    const resp = await fetch(`http://localhost:3001/api/superadmin/product-brands`);

    const data = await resp.json();

    dispatch({ type: PRODUCT_DETAILS, payload: data });
    
    return data;
  };
};

const searchProducts = (query, body) => {
  console.log(query)
  console.log(body)
  return async (dispatch) => {
    const resp = await fetch(`http://localhost:3001/api/product/search${query}`, {method:'GET', body});

    // const data = await resp.json();
    const data = []
    dispatch({ type: SEARCH_PRODUCTS, payload: data });
    
    return data;
  };
};

export default {
  getLatestProducts,
  productCategories,
  getProductDetails,
  getProductBrands,
  searchProducts
};
