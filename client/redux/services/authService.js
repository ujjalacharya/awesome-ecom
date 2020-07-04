import fetch from "isomorphic-unfetch";

export class AuthService {
  async loginUser(body, type) {
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/user-auth/signin`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
      });

      const data = await resp.json();
      
      if(resp.status >= 200 && resp.status < 300){
        return {
            isSuccess: true,
            data,
          };
      }else{
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
