import { getTokenService, postTokenService } from "../../utils/commonService";

export class CartService {
  getCartProducts(query, ctx) {
    let url = `${process.env.SERVER_BASE_URL}/api/cart-wishlist/carts?${query}`
    let data = getTokenService(url, 'GET', ctx);
    return data;
  }

  addToCart(query, body) {
    let url = `${process.env.SERVER_BASE_URL}/api/cart-wishlist/cart/${query}`
    let data = postTokenService(url, 'POST', body);
    return data;
  }

  removeCart(id) {
    let url = `${process.env.SERVER_BASE_URL}/api/cart-wishlist/delete-cart/${id}`
    let data = getTokenService(url, 'PATCH');
    return data;
  }

  editCartQty(query) {
    let url = `${process.env.SERVER_BASE_URL}/api/cart-wishlist/edit-cart/${query}`
    let data = getTokenService(url, 'PATCH');
    return data;
  }
  
}
