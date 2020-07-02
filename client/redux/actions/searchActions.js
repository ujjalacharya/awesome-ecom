import fetch from "isomorphic-unfetch";
import { SEARCH_PRODUCTS, SEARCH_FILTER } from "../types";


const searchProducts = (query) => {
  
  return async (dispatch) => {
    const productService = new ProductService();
    const response = await productService.searchProducts();
    if (response.isSuccess) {
      dispatch({ type: SEARCH_PRODUCTS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const searchFilter = (query) => {
  
    return async (dispatch) => {
      const productService = new ProductService();
    const response = await productService.searchFilter();
    if (response.isSuccess) {
      dispatch({ type: SEARCH_FILTER, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: response.errorMessage,
      });
    }
  };
}

export default {
  searchProducts,
  searchFilter
};
