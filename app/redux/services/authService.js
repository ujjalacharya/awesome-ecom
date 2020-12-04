import { postService } from "../../utils/commonService";
export const SERVER_BASE_URL = "http://192.168.1.68:3001"

export class AuthService {
  async loginUser(body) {
    let url = `${SERVER_BASE_URL}/api/user-auth/signin`
    let data = postService(url, 'POST', body);
    return data;
  }
  
}
