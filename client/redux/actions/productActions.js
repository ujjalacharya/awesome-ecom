import fetch from "isomorphic-unfetch";
import {
  MENU_CATEGORIES,
  PRODUCT_DETAILS,
  GLOBAL_ERROR,
  LATEST_PRODUCTS_LOADING,
  LATEST_PRODUCTS,
  TRENDING_PRODUCTS_LOADING,
  TRENDING_PRODUCTS,
  PRODUCT_QA,
  POST_QUESTION,
  PRODUCT_REVIEWS,
  POST_PRODUCT_REVIEWS,
  PRODUCT_DETAILS_START,
  PRODUCT_DETAILS_FINISH,
  TOP_SELLING_PRODUCTS_LOADING,
  TOP_SELLING_PRODUCTS,
  MOST_VIEWED_PRODUCTS_LOADING,
  MOST_VIEWED_PRODUCTS,
  FEATURED_PRODUCTS_LOADING,
} from "../types";
import { getCookie } from "../../utils/cookie";
import { ProductService } from "../services/productService";
import { WISHLIST_BASE_URL } from "../../utils/constants";
import { getChildCategories } from "../../utils/common";

const productCategories = () => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.productCategories();
    if (response.isSuccess) {
      let parentCategory = [];

      let parentCate = [];
      let {
        categories,
      } = response.data;

      categories.map((cate) => {
        if (cate.parent === undefined) {
          parentCategory.push(cate);
        }
      });

      let allCates = getChildCategories(categories, parentCategory);

      allCates.map((newChild) => {
        let newallCates = getChildCategories(categories, newChild.childCate);
        let parentCateEle = { ...newChild, childCate: newallCates };
        parentCate.push(parentCateEle);
      });

      dispatch({ type: MENU_CATEGORIES, payload: parentCate });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getMinedProducts = (ctx, keyword) => {
  return async (dispatch) => {
    switch (keyword) {
      case 'trending':
        dispatch({ type: TRENDING_PRODUCTS_LOADING });
        break;
      case 'latest':
        dispatch({ type: LATEST_PRODUCTS_LOADING });
        break;
      case 'topselling':
        dispatch({ type: TOP_SELLING_PRODUCTS_LOADING });
        break;
      case 'mostviewed':
        dispatch({ type: MOST_VIEWED_PRODUCTS_LOADING });
        break;
      case 'featured':
        dispatch({ type: FEATURED_PRODUCTS_LOADING });
        break;
      default:
        '';
    }
    const productService = new ProductService();
    const response = await productService.getMinedProducts(ctx, keyword);
    if (response.isSuccess) {
      switch (keyword) {
        case 'trending':
          dispatch({ type: TRENDING_PRODUCTS, payload: response.data })
          break;
        case 'latest':
          dispatch({ type: LATEST_PRODUCTS, payload: response.data })
          break;
        case 'topselling':
          dispatch({ type: TOP_SELLING_PRODUCTS, payload: response.data })
          break;
        case 'mostviewed':
          dispatch({ type: MOST_VIEWED_PRODUCTS, payload: response.data })
          break;
        case 'featured':
          dispatch({ type: FEATURED_PRODUCTS_LOADING, payload: response.data })
          break;
        default:
          '';
      }
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getProductDetails = (slug, ctx) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_START });
    const productService = new ProductService();
    const response = await productService.getProductDetails(slug, ctx);
    dispatch({ type: PRODUCT_DETAILS_FINISH });
    if (response.isSuccess) {
      dispatch({ type: PRODUCT_DETAILS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getQandA = (query) => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.getQandA(query);
    if (response.isSuccess) {
      dispatch({ type: PRODUCT_QA, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const postQuestion = (query, body) => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.postQuestion(query, body);
    if (response.isSuccess) {
      dispatch({ type: POST_QUESTION, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getProductReviews = (query) => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.getProductReviews(query);
    if (response.isSuccess) {
      dispatch({ type: PRODUCT_REVIEWS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const postReviews = (query, body) => {
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.postReviews(query, body);
    if (response.isSuccess) {
      dispatch({ type: POST_PRODUCT_REVIEWS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getOrders = (ctx) => {
  return async (dispatch) => {
    const resp = await fetch(
      `${WISHLIST_BASE_URL}/carts?page=1`,
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
  productCategories,
  getProductDetails,
  getOrders,
  getQandA,
  postQuestion,
  getProductReviews,
  postReviews,
  getMinedProducts
};
