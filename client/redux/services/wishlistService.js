import { postTokenService } from "../../utils/commonService";

export class WishlistService {
  async addWishListItems(slug) {
    let url = `${process.env.SERVER_BASE_URL}/api/cart-wishlist/wishlist/${slug}`
    let data = postTokenService(url, 'POST');
    return data;
  }
}
