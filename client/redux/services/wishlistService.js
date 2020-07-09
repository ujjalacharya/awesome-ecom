import { postTokenService } from "../../utils/commonService";

export class WishlistService {
  async addWishListItems(slug) {
    let url = `${process.env.SERVER_BASE_URL}/api/cart-wishlist/wishlist/${slug}`
    let data = postTokenService(url, 'POST');
    return data;
  }
  
  async removeFromWishList(id) {
    let url = `${process.env.SERVER_BASE_URL}/api/cart-wishlist/delete-wishlist/${id}`
    let data = postTokenService(url, 'PATCH');
    return data;
  }
}
