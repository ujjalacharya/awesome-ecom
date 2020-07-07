import fetch from "isomorphic-unfetch";

export class CartService {
  async getCartProducts(query) {
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/apicart-wishlist/carts?${query}`);

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
