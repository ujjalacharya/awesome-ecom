import { GET_BRANDS, SEARCH_PRODUCTS } from "../types";

const initialState = {
  getAllBrands: null,
  getSearchData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BRANDS:
      return { getAllBrands: action.payload };
      case SEARCH_PRODUCTS:
      return { getSearchData: action.payload };
    default:
      return state;
  }
};
