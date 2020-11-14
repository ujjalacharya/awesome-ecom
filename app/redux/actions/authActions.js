import {
  AUTHENTICATE,
  DEAUTHENTICATE,
  AUTHENTICATE_ERROR,
  GLOBAL_ERROR,
} from "../types";
import { isTokenExpired } from "../../utils/common";
import { AuthService } from "../services/authService";

// gets token from the api and stores it in the redux store and in cookie
const authenticate = (body, type, redirectUrl) => {
  return async (dispatch) => {
    // const authService = new AuthService();
    // const response = await authService.loginUser(body);

    // if (response.isSuccess) {
    //   setCookie("token", response.data.accessToken);
    //   dispatch({ type: AUTHENTICATE, payload: response.data.token });
      
    //   const redirectUrl = window.location.search
    //     ? window.location.search.split("=")[1]
    //     : "/";
    //   window.location.href = redirectUrl;
    // } else if (!response.isSuccess) {
    //   dispatch({ type: GLOBAL_ERROR, payload: response.errorMessage });
    // }
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
  // if (isTokenExpired(token)) {
  //   return (dispatch) => {
  //     removeCookie("token");
  //     dispatch({ type: DEAUTHENTICATE });
  //   };
  // }
  // return (dispatch) => {
  //   dispatch({ type: AUTHENTICATE, payload: token });
  // };
};

// removing the token
const deauthenticate = (route = "/") => {
  // return (dispatch) => {
  //   removeCookie("token");
  //   Router.push(route);
  //   dispatch({ type: DEAUTHENTICATE });
  // };
};

export default {
  authenticate,
  reauthenticate,
  deauthenticate,
};
