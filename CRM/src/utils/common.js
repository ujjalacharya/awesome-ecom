import jwt from "jsonwebtoken";
import socketIOClient from "socket.io-client";
import { JWT_SIGNIN_KEY, accessTokenKey, SERVER_URL } from "./config";
var socketUser
export const socket = () => {
  socketUser = socketIOClient(SERVER_URL)
  return socketUser
};

export const disconnectSocket = () => {
  return socketUser.close()
}

// export const getRealTimeNotifications = () => {
//   return socketUser.on("notification", data => data);
// }

export const decodeLocalStorage = () => {
    const token = localStorage.getItem(accessTokenKey);

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
  
    let jsontoken = localStorage.getItem(accessTokenKey);
  
    let data;
  
    if (jsontoken) {
      let token = jsontoken;
  
      jwt.verify(token, JWT_SIGNIN_KEY, async (err, decoded) => {
        if (err) {
          //need to check for other error as well..
          if (err.expiredAt !== undefined) {
            data = {user: { ...jwt.decode(token, JWT_SIGNIN_KEY)}};
          } else {
            data = false;
          }
        } else {
          data = decoded
        }
      });
      // localStorage.setItem(accessTokenKey, token);	
      return data;
    } else {
      return false;
    }
  };