import { WishlistService } from "../services/wishlistService";
import { GLOBAL_ERROR, ADD_WISHLIST_ITEMS, REMOVE_FROM_WISHLIST } from "../types";

const addWishListItems = (slug) => {
  return async (dispatch) => {
    const wishlistService = new WishlistService();
    const response = await wishlistService.addWishListItems(slug);
    if (response.isSuccess) {
      dispatch({ type: ADD_WISHLIST_ITEMS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const removeFromWishList = (id) => {
  return async (dispatch) => {
    const wishlistService = new WishlistService();
    const response = await wishlistService.removeFromWishList(id);
    if (response.isSuccess) {
      dispatch({ type: REMOVE_FROM_WISHLIST, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};


export default {
    addWishListItems,
    removeFromWishList
};
