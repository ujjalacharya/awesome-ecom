import { MENU_CATEGORIES, MENU_CATEGORIES_LOADING } from "../types";

const initialState = {
  menuCategories: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MENU_CATEGORIES:
      return { ...state, menuCategories: action.payload, loading: false };
    case MENU_CATEGORIES_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
