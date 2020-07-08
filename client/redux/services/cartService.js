import fetch from "isomorphic-unfetch";
import cookie from 'js-cookie';
import { getCookie } from "../../utils/cookie";

export class CartService {
  async getCartProducts(query, ctx) {
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/cart-wishlist/carts?${query}`,{
        method: 'GET',
        headers:{
          "x-auth-token": getCookie('token', ctx.req)
        }
      });
      
      const data = await resp.json();
      if(resp.status >= 200 && resp.status < 300){
        return {
            isSuccess: true,
            data,
          };
      }else{
        return {
            isSuccess: false,
            errorMessage: data.error,
          };    
      }
    } catch (err) {
      return {
        isSuccess: false,
        errorMessage: err,
      };
    }
  }

  async addToCart(query, body) {
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/cart-wishlist/cart/${query}`,{
        method: 'POST',
        headers:{
          'content-type': 'application/json',
          "x-auth-token": cookie.get("token")
        },
        body: JSON.stringify(body)
      });

      const data = await resp.json();
      
      if(resp.status >= 200 && resp.status < 300){
        return {
            isSuccess: true,
            data,
          };
      }else{
        return {
            isSuccess: false,
            errorMessage: data.error,
          };    
      }
    } catch (err) {
      return {
        isSuccess: false,
        errorMessage: err,
      };
    }
  }
  
}
