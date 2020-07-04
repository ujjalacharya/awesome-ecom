import fetch from "isomorphic-unfetch";

export class SearchService {
  async searchProducts(query, body) {
    try {
      const resp = await fetch(
        `${process.env.SERVER_BASE_URL}/api/product/search${query}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

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

  async getProductsByCategory(query) {
    try {
      const resp = await fetch(
        `${process.env.SERVER_BASE_URL}/api/product/by-categorys${query}`
      );

      const data = await resp.json();

      if ( resp.status >= 200 && resp.status < 300 ) {
        return {
          isSuccess: true,
          data,
        };
      } else {
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

  async searchFilter(query) {
    try {
      const resp = await fetch(
        `${process.env.SERVER_BASE_URL}/api/product/generate-filter${query}`
      );

      const data = await resp.json();

      if (resp.status >= 200 && resp.status < 300) {
        return {
          isSuccess: true,
          data,
        };
      } else {
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
