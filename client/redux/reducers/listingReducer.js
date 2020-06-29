import { SEARCH_PRODUCTS, SEARCH_FILTER } from "../types";

const initialState = {
  searchFilter: null,
  getSearchData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_FILTER:
      return { searchFilter: action.payload };
      case SEARCH_PRODUCTS:
        return { getSearchData: action.payload };
    default:
      return state;
  }
};
