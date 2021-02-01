import axios from "axios";
import store from "../redux/store";
import { SIGN_OUT, REFRESH_TOKEN, AUTH_ERROR , AUTH_TYPES} from "../redux/types";
import { SERVER_URL, refreshTokenKey, accessTokenKey } from "./config";
import setAuthToken from './setAuthToken'
import { verifyLocalStorage } from "./common";

const api = axios.create({
  baseURL: `${SERVER_URL}api`,
  headers: {

    "Content-Type": "application/json",
  },
  // withCredentials: true// should be only post req
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/
api.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers["x-auth-token"] = verifyLocalStorage() ? localStorage.getItem(accessTokenKey) : null;
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if(err.message === "Network Error") {
      return Promise.reject("You are offline.")
    }
    if (err.response?.data?.error === "jwt expired") {
      //call for refresh token
      const originalReq = err.config;
      try {
        const body = JSON.stringify({
          refreshToken: localStorage.getItem(refreshTokenKey),
        });
        const res = await api.post(`/admin-auth/refresh-token`, body);
        store.dispatch({
          type: AUTH_TYPES.REFRESH_TOKEN,
          payload: res.data,
        });
        originalReq.headers["x-auth-token"] = res.data.accessToken;
        return api(originalReq);
      } catch (err) {
        console.log("****refresh token error****", err);
        store.dispatch({
          type: AUTH_TYPES.AUTH_ERROR,
        });
        return Promise.reject(err);
      }
    }
    if (err.response?.status === 401) {
      store.dispatch({ type:AUTH_TYPES.AUTH_ERROR });
      return Promise.reject(err.response.data.error);
    }
    if (err.response?.status === 404) {
      return Promise.reject(err.response.data?.error || "Page not found");
    }
    if (err.response?.status >= 400 && err.response?.status <= 500) {
      return Promise.reject(err.response.data.error);
    }
    return Promise.reject(err)
  }
);

export default api;
