import { MENU_CATEGORIES } from "../types";

const initialState = {
  menuCategories: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MENU_CATEGORIES:
      return {...state, menuCategories: action.payload };
    default:
      return state;
  }
};
