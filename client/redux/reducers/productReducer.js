import { LATEST_PRODUCTS, MENU_CATEGORIES } from "../types";

const initialState = {
  latestProducts: null,
  menuCategories: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MENU_CATEGORIES:
      return { menuCategories: action.payload };
    case LATEST_PRODUCTS:
      return { latestProducts: action.payload };
    default:
      return state;
  }
};
