import { SERVER_BASE_URL } from "../../utils/common";
import { postTokenService, getTokenService } from "../../utils/commonService";

export class WishlistService {
  async getWishListItems(query, token) {
    let url = `${SERVER_BASE_URL}/api/cart-wishlist/wishlists?${query}`
    let data = getTokenService(url, 'GET', token);
    return data;
  }

  async addWishListItems(slug) {
    let url = `${SERVER_BASE_URL}/api/cart-wishlist/wishlist/${slug}`
    let data = postTokenService(url, 'POST');
    return data;
  }

  async removeFromWishList(id) {
    let url = `${SERVER_BASE_URL}/api/cart-wishlist/delete-wishlist/${id}`
    let data = postTokenService(url, 'PATCH');
    return data;
  }
}
