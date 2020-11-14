import { getService, getTokenService, postTokenService } from "../../utils/commonService";

export class ProductService {
  getLatestProducts(ctx) {
    let url = `${process.env.SERVER_BASE_URL}/api/product/latest`
    let data = getTokenService(url, 'GET', ctx);
    return data;
  }

  productCategories() {
    let url = `http://192.168.1.68:3001/api/superadmin/product-categories`
    let data = getService(url, 'GET');
    return data;
  }

  getProductDetails(slug, ctx) {
    let url = `${process.env.SERVER_BASE_URL}/api/product/${slug}`
    let data = getTokenService(url, 'GET', ctx);
    return data;
  }

  async getQandA(query) {
    let url = `${process.env.SERVER_BASE_URL}/api/review-qna/qna/${query}&perPage=5`
    let data = getService(url, 'GET');
    return data;
  }

  async postQuestion(query, body) {
    let url = `${process.env.SERVER_BASE_URL}/api/review-qna/qna/${query}`
    let data = postTokenService(url, 'POST', body);
    return data;
  }

  async getProductReviews(query) {
    let url = `${process.env.SERVER_BASE_URL}/api/review-qna/review/${query}`
    let data = getService(url, 'GET');
    return data;
  }

  async postReviews(query, body) {
    let url = `${process.env.SERVER_BASE_URL}/api/review-qna/review/${query}`
    let data = postTokenService(url, 'POST', body);
    return data;
  }
}
