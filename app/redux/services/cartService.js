import { SERVER_BASE_URL } from "../../utils/common";
import { getTokenService, postTokenService } from "../../utils/commonService";

export class CartService {
  getCartProducts(query, token) {
    let url = `${SERVER_BASE_URL}/api/cart-wishlist/carts?${query}&perPage=20`
    let data = getTokenService(url, 'GET', token);
    return data;
  }

  addToCart(query, body) {
    let url = `${SERVER_BASE_URL}/api/cart-wishlist/cart/${query}`
    let data = postTokenService(url, 'POST', body);
    return data;
  }

  removeCart(id) {
    let url = `${SERVER_BASE_URL}/api/cart-wishlist/delete-cart/${id}`
    let data = getTokenService(url, 'PATCH');
    return data;
  }

  editCartQty(query) {
    let url = `${SERVER_BASE_URL}/api/cart-wishlist/edit-cart/${query}`
    let data = getTokenService(url, 'PATCH');
    return data;
  }
  
}
