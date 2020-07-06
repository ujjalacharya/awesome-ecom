import fetch from "isomorphic-unfetch";
import cookie from 'js-cookie';

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

  async addAddress(body) {
    
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/user/add-address`,{
        method: 'POST',
        headers:{
          'content-type':'application/json',
          "x-auth-token": cookie.get("token")
        },
        body: JSON.stringify(body)
      });

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

  async editAddress(id, body) {
    
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/user/edit-address/${id}`,{
        method: 'PUT',
        headers:{
          'content-type':'application/json',
          "x-auth-token": cookie.get("token")
        },
        body: JSON.stringify(body)
      });

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
