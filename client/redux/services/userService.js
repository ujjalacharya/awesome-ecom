import fetch from "isomorphic-unfetch";

export class UserService {
  async getUserProfile(id) {
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/user/${id}`);

      const data = await resp.json();

      if (resp.status >= 200 && resp.status < 300) {
        return {
          isSuccess: true,
          data,
        };
      } else {
        return {
          isSuccess: false,
          errorMessage: data.error,
        };
      }
    } catch (err) {
      return {
        isSuccess: false,
        errorMessage: err,
      };
    }
  }
  
}
