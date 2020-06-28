import fetch from "isomorphic-unfetch";
import { getCookie } from "../../utils/cookie";

export class ProductService {
  getOrders(ctx) {
    return fetch(`http://localhost:3001/api/cart-wishlist/carts?page=1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": getCookie("token", ctx),
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  }
}
