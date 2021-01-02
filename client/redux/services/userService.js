import { postTokenService, getTokenService, uploadImageService } from "../../utils/commonService";
import { REVIEW_BASE_URL, USER_BASE_URL } from "../../utils/constants";

export class UserService {
  async getUserProfile(id, ctx) {
    let url = `${USER_BASE_URL}/${id}`
    let data = getTokenService(url, 'GET', ctx);
    return data;
  }

  async addAddress(body) {
    let url = `${USER_BASE_URL}/add-address`
    let data = postTokenService(url, 'POST', body);
    return data;
  }

  async editAddress(id, body) {
    let url = `${USER_BASE_URL}/edit-address/${id}`
    let data = postTokenService(url, 'PUT', body);
    return data;
  }

  async toggleActiveAddress(query) {
    let url = `${USER_BASE_URL}/toggle-address-activeness?${query}`
    let data = getTokenService(url, 'PATCH');
    return data;
  }

  async updateProfilePicture(body) {
    let url = `${USER_BASE_URL}`
    let data = uploadImageService(url, 'PATCH', body);
    return data;
  }

  async getMyReviews(query, ctx) {
    let url = `${REVIEW_BASE_URL}/my-reviews?${query}&perPage=5`
    let data = getTokenService(url, 'GET', ctx);
    return data;
  }
  
}
