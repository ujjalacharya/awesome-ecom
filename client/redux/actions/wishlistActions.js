import { openNotification } from "../../utils/common";
import { ProductService } from "../services/productService";
import { WishlistService } from "../services/wishlistService";
import {
  GLOBAL_ERROR,
  ADD_WISHLIST_ITEMS,
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST_ITEMS,
  UPDATE_TRENDING_PRODUCTS,
  TRENDING_PRODUCTS
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

const addWishListItems = (slug, sliderName) => {
  return async (dispatch) => {
    const wishlistService = new WishlistService();
    const response = await wishlistService.addWishListItems(slug);
    if (response.isSuccess) {
      const productService = new ProductService();
      switch (sliderName) {
        case 'trending':
          const prodResponse = await productService.getMinedProducts('', 'trending');
          dispatch({ type: TRENDING_PRODUCTS, payload: prodResponse.data });
          break;
      }

      openNotification("Success", "Product added to wishlist successfully");
      dispatch({ type: ADD_WISHLIST_ITEMS, payload: response.data });

      // switch (sliderName){
      //   case 'trending':
      // }
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const removeFromWishList = (id, sliderName) => {
  return async (dispatch) => {
    const wishlistService = new WishlistService();
    const response = await wishlistService.removeFromWishList(id);
    if (response.isSuccess) {
      const productService = new ProductService();
      switch (sliderName) {
        case 'trending':
          const prodResponse = await productService.getMinedProducts('', 'trending');
          dispatch({ type: TRENDING_PRODUCTS, payload: prodResponse.data });
          break;
      }
      openNotification("Success", "Product removed from wishlist successfully");
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
