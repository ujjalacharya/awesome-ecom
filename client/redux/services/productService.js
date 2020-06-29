import fetch from "isomorphic-unfetch";

export class ProductService {
  async getLatestProducts() {
    try {
      const resp = await fetch("http://localhost:3001/api/product/latest");

      const data = await resp.json();

      return {
        isSuccess: true,
        data,
      };
    } catch (err) {
      return {
        isSuccess: false,
        errorMessage: err,
      };
    }
  }
}
