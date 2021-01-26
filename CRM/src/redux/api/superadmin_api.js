import { postService, getService } from "../commonServices";

export class SuperadminService {
  getAdmins(page,perPage,status='') {
    let url = `/superadmin/admins?page=${page}&perPage=${perPage}&status=${status}`;
    let data = getService(url);;
    return data;
  }

  getAdmin(id) {
    let url = `/admin/${id}`;
    let data = getService(url);
    return data;
  }
}
