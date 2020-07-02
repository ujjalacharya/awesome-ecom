import fetch from "isomorphic-unfetch";

export class SearchService {
  async searchProducts(query) {
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/product/search${query}`);

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

  async searchFilter(query) {
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/product/generate-filter${query}`);

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
