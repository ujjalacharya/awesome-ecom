import { postService, getService } from "../commonServices";

export class ProfileService {
  updateProfile(profile, id) {
    const body = JSON.stringify(profile)
    let url = `/admin/${id}`;
    let data = postService(url, body, 'PUT');;
    return data;
  }

  updateBank(bank, id) {
    const body = JSON.stringify(bank)
    let url = `/admin/${id}`;
    let data = postService(url, body, 'PUT');;
    return data;
  }
  getAdminBank (id) {
    let url = `/admin/bank/${id}`;
    let data = getService(url);
    return data;
  }
}
