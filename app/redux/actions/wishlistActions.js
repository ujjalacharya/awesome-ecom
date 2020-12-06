import { WishlistService } from "../services/wishlistService";
import {
  GLOBAL_ERROR,
  ADD_WISHLIST_ITEMS,
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST_ITEMS,
} from "../types";
import { getProductDetails } from "./productActions";

export const getWishListItems = (query, token) => {
  return async (dispatch) => {
    const wishlistService = new WishlistService();
    const response = await wishlistService.getWishListItems(query, token);
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

export const addWishListItems = (slug, token) => {
  return async (dispatch) => {
    const wishlistService = new WishlistService();
    const response = await wishlistService.addWishListItems(slug, token);
    if (response.isSuccess) {
      dispatch({ type: ADD_WISHLIST_ITEMS, payload: response.data });
      dispatch(getProductDetails(slug, token));
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

export const removeFromWishList = (id, slug, token) => {
  return async (dispatch) => {
    const wishlistService = new WishlistService();
    const response = await wishlistService.removeFromWishList(id, token);
    if (response.isSuccess) {
      dispatch({ type: REMOVE_FROM_WISHLIST, payload: response.data });
      dispatch(getProductDetails(slug, token));
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
