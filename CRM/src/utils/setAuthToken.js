import api from "./api";
import { accessTokenKey } from "./config";

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem(accessTokenKey, token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem(accessTokenKey);
  }
};

export default setAuthToken;
