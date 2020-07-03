import fetch from "isomorphic-unfetch";

export class UserService {
  async getUserProfile(id) {
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/user/${id}`);

      const data = await resp.json();

      return {
        isSuccess: true,
        data,
      };
    } catch (err) {
      return {
        isSuccess: false,
        errorMessage: err,
      };
    }
  }
  
}
