import fetch from "isomorphic-unfetch";
import { SEARCH_PRODUCTS, SEARCH_FILTER, SEARCH_ERROR } from "../types";
import { SearchService } from "../services/searchService";

const searchProducts = (query) => {
  return async (dispatch) => {
    const searchService = new SearchService();
    const response = await searchService.searchProducts(query);
    if (response.isSuccess) {
      dispatch({ type: SEARCH_PRODUCTS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: SEARCH_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const searchFilter = (query) => {
  return async (dispatch) => {
    const searchService = new SearchService();
    const response = await searchService.searchFilter(query);
    if (response.isSuccess) {
      dispatch({ type: SEARCH_FILTER, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: SEARCH_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

export default {
  searchProducts,
  searchFilter,
};
