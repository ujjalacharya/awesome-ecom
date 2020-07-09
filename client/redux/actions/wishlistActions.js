import { WishlistService } from "../services/wishlistService";
import {
  GLOBAL_ERROR,
  ADD_WISHLIST_ITEMS,
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST_ITEMS,
} from "../types";

const getWishListItems = (query) => {
  return async (dispatch) => {
    const wishlistService = new WishlistService();
    const response = await wishlistService.getWishListItems(query);
    if (response.isSuccess) {
      dispatch({ type: GET_WISHLIST_ITEMS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

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
  getWishListItems,
  addWishListItems,
  removeFromWishList,
};
