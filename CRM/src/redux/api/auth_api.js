import { postService } from "../commonServices";

export class AuthService {
  loginUser(email, password) {
    const body = JSON.stringify({ email, password });
    let url = `/admin-auth/signin`;
    let data = postService(url, body);
    return data;
  }
}
