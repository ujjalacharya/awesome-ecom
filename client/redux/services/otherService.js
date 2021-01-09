import { getService, postService } from "../../utils/commonService";
import { SUPER_AUTH_BASE_URL } from "../../utils/constants";

export class OtherService {
  getBannerImages() {
    let url = `${SUPER_AUTH_BASE_URL}/banner?page=1&perPage=10`
    let data = getService(url, 'GET');
    return data;
  }
  subscribeLead(body) {
    let url = `${SUPER_AUTH_BASE_URL}/add-lead`
    let data = postService(url, 'POST', body);
    return data;
  }
}
