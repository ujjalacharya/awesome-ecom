import { ADD_WISHLIST_ITEMS } from "../types";

const initialState = {
    wishlistItemsResp: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WISHLIST_ITEMS:
      return { ...state, wishlistItemsResp: action.payload, hasError: false };
    default:
      return state;
  }
};
