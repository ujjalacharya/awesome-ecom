import {
  getService,
  postTokenService,
  getTokenService,
  uploadImageService,
} from "../../utils/commonService";

export const SERVER_BASE_URL = "http://192.168.1.68:3001";

export class UserService {
  async getUserProfile(id) {
    let url = `${SERVER_BASE_URL}/api/user/${id}`;
    let data = getService(url, "GET");
    return data;
  }

  async addAddress(body) {
    let url = `${SERVER_BASE_URL}/api/user/add-address`;
    let data = postTokenService(url, "POST", body);
    return data;
  }

  async editAddress(id, body) {
    let url = `${SERVER_BASE_URL}/api/user/edit-address/${id}`;
    let data = postTokenService(url, "PUT", body);
    return data;
  }

  async toggleActiveAddress(query) {
    let url = `${SERVER_BASE_URL}/api/user/toggle-address-activeness?${query}`;
    let data = getTokenService(url, "PATCH");
    return data;
  }

  async updateProfilePicture(body) {
    let url = `${SERVER_BASE_URL}/api/user`;
    let data = uploadImageService(url, "PATCH", body);
    return data;
  }

  async getMyReviews(query) {
    let url = `${SERVER_BASE_URL}/api/review-qna/my-reviews?${query}&perPage=5`;
    let data = uploadImageService(url, "GET");
    return data;
  }
}
