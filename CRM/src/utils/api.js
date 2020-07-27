import axios from "axios";
import store from "../redux/store";
import { SIGN_OUT} from '../redux/types'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true// should be only post req
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err);
    // if (err.response.data.error === "jwt malformed") {
    //   store.dispatch({ type: SIGN_OUT });
    //   return Promise.reject(err);
    // }
    // if (err.response.data.error === "jwt expired") {
    //   //call for refresh token
    //   store.dispatch({ type: SIGN_OUT });
    //   return Promise.reject(err);
    // }
  }
);

export default api;
