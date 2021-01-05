import { mutliProductCardSekelton } from "../../utils/skeletons";
import { SEARCH_PRODUCTS, SEARCH_FILTER, SEARCH_ERROR, SEARCH_KEYWORD, SEARCH_PRODUCTS_START, SEARCH_PRODUCTS_FINISH } from "../types";

const initialState = {
  getSearchFilter: null,
  getSearchData: null,
  getSearchKeywords: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PRODUCTS_START:
      return { ...state, getSearchData: mutliProductCardSekelton, searchLoading: true, hasError: true };
    case SEARCH_PRODUCTS_FINISH:
      return { ...state, searchLoading: false, hasError: true };
    case SEARCH_KEYWORD:
      return { ...state, getSearchKeywords: action.payload, hasError: false };
    case SEARCH_FILTER:
      return { ...state, getSearchFilter: action.payload, hasError: false };
    case SEARCH_PRODUCTS:
      return { ...state, getSearchData: action.payload, hasError: false };
    case SEARCH_ERROR:
      return { ...state, searchError: action.payload, hasError: true };
    default:
      return state;
  }
};
