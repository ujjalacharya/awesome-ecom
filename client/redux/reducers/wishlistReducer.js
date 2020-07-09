import { ADD_WISHLIST_ITEMS, REMOVE_FROM_WISHLIST } from "../types";

const initialState = {
  wishlistItemsResp: null,
  removeFromWishlistResp: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WISHLIST_ITEMS:
      return { ...state, wishlistItemsResp: action.payload, hasError: false };
    case REMOVE_FROM_WISHLIST:
      return { ...state, removeFromWishlistResp: action.payload, hasError: false };
    default:
      return state;
  }
};
