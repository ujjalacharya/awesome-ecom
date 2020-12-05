import { postService } from "../../utils/commonService";
import { SERVER_BASE_URL } from "../../utils/common";
export class AuthService {
  async loginUser(body) {
    let url = `${SERVER_BASE_URL}/api/user-auth/signin`
    let data = postService(url, 'POST', body);
    return data;
  }
  
}
