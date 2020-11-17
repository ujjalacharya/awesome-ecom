import { getService, postService } from "../../utils/commonService";

export class SearchService {
  async getSearchKeywords(query) {
    let url = `${process.env.SERVER_BASE_URL}/api/product/suggest-keywords?keyword=${query}&limits=8`
    let data = getService(url, 'GET');
    return data;
  }

  async searchProducts(query, body) {
    let url = `${process.env.SERVER_BASE_URL}/api/product/search${query}`
    let data = postService(url, 'POST', body);
    return data;
  }

  async getProductsByCategory(query) {
    let url = `${process.env.SERVER_BASE_URL}/api/product/by-category${query}`
    let data = getService(url, 'GET');
    return data;
  }

  async searchFilter(query) {
    let url = `${process.env.SERVER_BASE_URL}/api/product/generate-filter${query}`
    let data = getService(url, 'GET');
    return data;
  }
}
