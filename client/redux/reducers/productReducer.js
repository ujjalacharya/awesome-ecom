import { LATEST_PRODUCTS, MENU_CATEGORIES } from "../types";

const initialState = {
  latestproducts: null,
  menuCategories: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MENU_CATEGORIES:
      return { menuCategories: action.payload };
    case LATEST_PRODUCTS:
      return { latestproducts: action.payload };
    default:
      return state;
  }
};
