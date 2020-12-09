import { postService } from "../../utils/commonService";

export class AuthService {
  async loginUser(body) {
    let url = `${process.env.SERVER_BASE_URL}/api/user-auth/signin`
    let data = postService(url, 'POST', body);
    return data;
  }
  
  async registerUser(body) {
    let url = `${process.env.SERVER_BASE_URL}/api/user-auth/signup`
    let data = postService(url, 'POST', body);
    return data;
  }
}
