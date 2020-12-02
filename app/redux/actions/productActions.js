// import fetch from "isomorphic-unfetch";
import {
  LATEST_PRODUCTS,
  MENU_CATEGORIES,
  PRODUCT_DETAILS,
  PRODUCT_DETAILS_LOADING,
  GLOBAL_ERROR,
  LATEST_LOADING,
  PRODUCT_QA,
  POST_QUESTION,
  PRODUCT_REVIEWS,
  PRODUCT_REVIEWS_INIT,
  POST_PRODUCT_REVIEWS,
  MENU_CATEGORIES_LOADING
} from "../types";
// import { setCookie, removeCookie, getCookie } from "../../utils/cookie";
import { ProductService } from "../services/productService";

export const productCategories = () => {
  return async (dispatch) => {
    // dispatch(categoriesLoading());
    const productService = new ProductService();
    const response = await productService.productCategories();
    if (response.isSuccess) {
      dispatch({ type: MENU_CATEGORIES, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

export const categoriesLoading = () => {
  return (dispatch) => {
    dispatch({ type: MENU_CATEGORIES_LOADING });
  };
};

export const getLatestProducts = () => {
  return async (dispatch) => {
    dispatch({type: LATEST_LOADING, payload: []})
    const productService = new ProductService();
    const response = await productService.getLatestProducts();
    if (response.isSuccess) {
      dispatch({ type: LATEST_PRODUCTS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

export const getProductDetails = (slug) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_LOADING });
    const productService = new ProductService();
    const response = await productService.getProductDetails(slug);
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

// const getQandA = (query) => {
//   return async (dispatch) => {
//     const productService = new ProductService();
//     const response = await productService.getQandA(query);
//     if (response.isSuccess) {
//       dispatch({ type: PRODUCT_QA, payload: response.data });
//     } else if (!response.isSuccess) {
//       dispatch({
//         type: GLOBAL_ERROR,
//         payload: response.errorMessage,
//       });
//     }
//   };
// };

// const postQuestion = (query, body) => {
//   return async (dispatch) => {
//     const productService = new ProductService();
//     const response = await productService.postQuestion(query, body);
//     if (response.isSuccess) {
//       dispatch({ type: POST_QUESTION, payload: response.data });
//     } else if (!response.isSuccess) {
//       dispatch({
//         type: GLOBAL_ERROR,
//         payload: response.errorMessage,
//       });
//     }
//   };
// };

export const getProductReviews = (query) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_REVIEWS_INIT });
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

// const postReviews = (query, body) => {
//   return async (dispatch) => {
//     const productService = new ProductService();
//     const response = await productService.postReviews(query, body);
//     if (response.isSuccess) {
//       dispatch({ type: POST_PRODUCT_REVIEWS, payload: response.data });
//     } else if (!response.isSuccess) {
//       dispatch({
//         type: GLOBAL_ERROR,
//         payload: response.errorMessage,
//       });
//     }
//   };
// };

// const getOrders = (ctx) => {
//   return async (dispatch) => {
//     const resp = await fetch(
//       `${process.env.SERVER_BASE_URL}/api/cart-wishlist/carts?page=1`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "x-auth-token": getCookie("token", ctx),
//         },
//       }
//     );
//     const data = await resp.json();

//     dispatch({ type: "check", payload: data });

//     return data;
//   };
// };

export default {
  getLatestProducts,
  productCategories,
  // getProductDetails,
  // getOrders,
  // getQandA,
  // postQuestion,
  // getProductReviews,
  // postReviews
};
