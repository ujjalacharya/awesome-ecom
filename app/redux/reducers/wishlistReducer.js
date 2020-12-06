import {
  ADD_WISHLIST_ITEMS,
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST_ITEMS,
  GET_WISHLIST_ITEMS_INIT
} from "../types";

const initialState = {
  wishlistItemsResp: null,
  removeFromWishlistResp: null,
  getWishlistItems: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WISHLIST_ITEMS:
      return { ...state, wishlistItemsResp: action.payload, hasError: false };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        removeFromWishlistResp: action.payload,
        hasError: false,
      };
    case GET_WISHLIST_ITEMS_INIT:
      return {
        ...state,
        getWishlistItems: null,
        hasError: false,
      };
    case GET_WISHLIST_ITEMS:
      return {
        ...state,
        getWishlistItems: action.payload,
        hasError: false,
      };
    default:
      return state;
  }
};
