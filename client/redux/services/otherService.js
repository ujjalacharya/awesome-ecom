import { getService } from "../../utils/commonService";

export class OtherService {
  getBannerImages() {
    let url = `${process.env.SERVER_BASE_URL}/api/superadmin/banner?page=1&perPage=10`
    let data = getService(url, 'GET');
    return data;
  }
}
