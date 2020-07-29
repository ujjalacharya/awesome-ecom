import jwt from "jsonwebtoken";

export const decodeLocalStorage = () => {
    const token = localStorage.getItem("token");

    if(token){
        const decoded = jwt.decode(token);
        return decoded;
    }
    return null;

}

export const verifyLocalStorage = () => {
    if (typeof window == "undefined") {
      return false;
    }
  
    let jsontoken = localStorage.getItem("token");
  
    let data;
  
    if (jsontoken) {
      let token = jsontoken;
  
      jwt.verify(token, process.env.REACT_APP_JWT_SIGNIN_KEY, async (err, decoded) => {
        if (err) {
          if (err.expiredAt !== undefined) {
            data = { token, user: { ...jwt.decode(token, process.env.REACT_APP_JWT_SIGNIN_KEY) } };
          } else {
            data = false;
          }
        } else {
          data = decoded
        }
      });
      localStorage.setItem("token", token);	
      return data;
    } else {
      return false;
    }
  };