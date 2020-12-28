import { getService, getTokenService, postTokenService } from "../../utils/commonService";
import { BASE_URL, PRODUCT_BASE_URL, REVIEW_BASE_URL } from "../../utils/constants";

export class ProductService {
  // getLatestProducts(ctx) {
  //   let url = `${PRODUCT_BASE_URL}/latest`
  //   let data = getTokenService(url, 'GET', ctx);
  //   return data;
  // }

  getMinedProducts(ctx, keyword) {
    let url = `${PRODUCT_BASE_URL}/mined-products?page=1&perPage=10&keyword=${keyword}`
    let data = getTokenService(url, 'GET', ctx);
    return data;
  }

  productCategories() {
    let url = `${BASE_URL}/api/superadmin/product-categories`
    let data = getService(url, 'GET');
    return data;
  }

  getProductDetails(slug, ctx) {
    let url = `${PRODUCT_BASE_URL}/${slug}`
    let data = getTokenService(url, 'GET', ctx);
    return data;
  }

  async getQandA(query) {
    let url = `${REVIEW_BASE_URL}/qna/${query}&perPage=5`
    let data = getService(url, 'GET');
    return data;
  }

  async postQuestion(query, body) {
    let url = `${REVIEW_BASE_URL}/qna/${query}`
    let data = postTokenService(url, 'POST', body);
    return data;
  }

  async getProductReviews(query) {
    let url = `${REVIEW_BASE_URL}/review/${query}`
    let data = getService(url, 'GET');
    return data;
  }

  async postReviews(query, body) {
    let url = `${REVIEW_BASE_URL}/review/${query}`
    let data = postTokenService(url, 'POST', body);
    return data;
  }
}
