import fetch from "isomorphic-unfetch";
import cookie from 'js-cookie';

export class ProductService {
  async getLatestProducts() {
    try {
      const resp = await fetch(
        `${process.env.SERVER_BASE_URL}/api/product/latest`
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

  async productCategories() {
    try {
      const resp = await fetch(
        `${process.env.SERVER_BASE_URL}/api/superadmin/product-categories`
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

  async getProductDetails(slug) {
    try {
      const resp = await fetch(
        `${process.env.SERVER_BASE_URL}/api/product/${slug}`
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

  async getQandA(query) {
    try {
      const resp = await fetch(
        `${process.env.SERVER_BASE_URL}/api/review-qna/qna/${query}`
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

  async postQuestion(query, body) {
    try {
      const resp = await fetch(
        `${process.env.SERVER_BASE_URL}/api/review-qna/qna/${query}`,{
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            "x-auth-token": cookie.get("token")
          },
          body: JSON.stringify(body)
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

  async getProductReviews(query) {
    try {
      const resp = await fetch(
        `${process.env.SERVER_BASE_URL}/api/review-qna/review/${query}`
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

  async postReviews(query, body) {
    try {
      const resp = await fetch(
        `${process.env.SERVER_BASE_URL}/api/review-qna/review/${query}`,{
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            "x-auth-token": cookie.get("token")
          },
          body: JSON.stringify(body)
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
}
