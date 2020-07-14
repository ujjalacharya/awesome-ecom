import axios from "axios";
import store from "../redux/store";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
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
    if (err.response.data.msg === "JWT malformed") {
      //   store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
