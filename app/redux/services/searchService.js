import queryString from "query-string";
import { getService, postService } from "../../utils/commonService";
import { SERVER_BASE_URL } from "../../utils/common";

export class SearchService {
  async getSearchKeywords(query) {
    let url = `${SERVER_BASE_URL}/api/product/suggest-keywords?keyword=${query}&limits=8`;
    let data = getService(url, "GET");
    return data;
  }

  async searchProducts(query, body) {
    let url = `${SERVER_BASE_URL}/api/product/search${query}`;
    let data = postService(url, "POST", body);
    return data;
  }

  async getProductsByCategory(query) {
    let url = `${SERVER_BASE_URL}/api/product/by-category${query}`;
    let data = getService(url, "GET");
    return data;
  }

  async searchFilter(query) {
    const queryData = queryString.stringify(query);
    let url = `${SERVER_BASE_URL}/api/product/generate-filter?${queryData}`;
    let data = getService(url, "GET");
    return data;
  }
}
