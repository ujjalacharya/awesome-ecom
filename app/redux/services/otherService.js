import { getService } from "../../utils/commonService";
import { SERVER_BASE_URL } from "./productService";

export class OtherService {
  getBannerImages() {
    let url = `${SERVER_BASE_URL}/api/superadmin/banner?page=1&perPage=10`
    let data = getService(url, 'GET');
    return data;
  }
}
