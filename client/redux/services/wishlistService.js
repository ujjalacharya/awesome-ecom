import { postTokenService, getTokenService } from "../../utils/commonService";
import { WISHLIST_BASE_URL } from "../../utils/constants";

export class WishlistService {
  async getWishListItems(query) {
    let url = `${WISHLIST_BASE_URL}/wishlists?${query}`
    let data = getTokenService(url, 'GET');
    return data;
  }

  async addWishListItems(slug) {
    let url = `${WISHLIST_BASE_URL}/wishlist/${slug}`
    let data = postTokenService(url, 'POST');
    return data;
  }

  async removeFromWishList(id) {
    let url = `${WISHLIST_BASE_URL}/delete-wishlist/${id}`
    let data = postTokenService(url, 'PATCH');
    return data;
  }
}
