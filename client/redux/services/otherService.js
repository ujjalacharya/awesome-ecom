import { getService } from "../../utils/commonService";
import { BASE_URL } from "../../utils/constants";

export class OtherService {
  getBannerImages() {
    let url = `${BASE_URL}/api/superadmin/banner?page=1&perPage=10`
    let data = getService(url, 'GET');
    return data;
  }
}
