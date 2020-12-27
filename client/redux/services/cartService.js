import { getTokenService, postTokenService } from "../../utils/commonService";
import { CART_BASE_URL } from "../../utils/constants";

export class CartService {
  getCartProducts(query, ctx) {
    let url = `${CART_BASE_URL}/carts?${query}&perPage=20`
    let data = getTokenService(url, 'GET', ctx);
    return data;
  }

  addToCart(query, body) {
    let url = `${CART_BASE_URL}/cart/${query}`
    let data = postTokenService(url, 'POST', body);
    return data;
  }

  removeCart(id) {
    let url = `${CART_BASE_URL}/delete-cart/${id}`
    let data = getTokenService(url, 'PATCH');
    return data;
  }

  editCartQty(query) {
    let url = `${CART_BASE_URL}/edit-cart/${query}`
    let data = getTokenService(url, 'PATCH');
    return data;
  }
  
}
