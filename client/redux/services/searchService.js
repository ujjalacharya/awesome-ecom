import { getService, getTokenService, postService } from "../../utils/commonService";
import { PRODUCT_BASE_URL } from "../../utils/constants";

export class SearchService {
  async getSearchKeywords(query) {
    let url = `${PRODUCT_BASE_URL}/suggest-keywords?keyword=${query}&limits=8`
    let data = getService(url, 'GET');
    return data;
  }

  async searchProducts(query, body) {
    let url = `${PRODUCT_BASE_URL}/search${query}`
    let data = postService(url, 'POST', body);
    return data;
  }

  async getProductsByCategory(query, ctx) {
    let url = `${PRODUCT_BASE_URL}/by-category${query}`
    let data = getTokenService(url, 'GET', ctx);
    return data;
  }

  async searchFilter(query) {
    let url = `${PRODUCT_BASE_URL}/generate-filter${query}`
    let data = getService(url, 'GET');
    return data;
  }
}
