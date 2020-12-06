import { getService, getTokenService, postTokenService } from "../../utils/commonService";
import { SERVER_BASE_URL } from "../../utils/common";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export class ProductService {
  getLatestProducts() {
    let url = `${SERVER_BASE_URL}/api/product/latest`
    let data = getService(url, 'GET');
    return data;
  }

  productCategories() {
    let url = `${SERVER_BASE_URL}/api/superadmin/product-categories`
    let data = getService(url, 'GET');
    return data;
  }

  getProductDetails(slug, token) {
    let url = `${SERVER_BASE_URL}/api/product/${slug}`
    let data = token ? getTokenService(url, 'GET', token) : getService(url, 'GET');
    return data;
  }

  async getQandA(query) {
    let url = `${SERVER_BASE_URL}/api/review-qna/qna/${query}`
    let data = getService(url, 'GET');
    return data;
  }

  async postQuestion(query, body) {
    let url = `${SERVER_BASE_URL}/api/review-qna/qna/${query}`
    let data = postTokenService(url, 'POST', body);
    return data;
  }

  async getProductReviews(query) {
    let url = `${SERVER_BASE_URL}/api/review-qna/review/${query}`
    let data = getService(url, 'GET');
    return data;
  }

  async postReviews(query, body) {
    let url = `${SERVER_BASE_URL}/api/review-qna/review/${query}`
    let data = postTokenService(url, 'POST', body);
    return data;
  }
}
