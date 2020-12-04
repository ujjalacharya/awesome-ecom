import {
  AUTHENTICATE,
  AUTHENTICATE_INIT,
  DEAUTHENTICATE,
  AUTHENTICATE_ERROR,
  GLOBAL_ERROR,
} from "../types";
import { isTokenExpired } from "../../utils/common";
import { AuthService } from "../services/authService";
import { AsyncStorage } from "react-native";

// gets token from the api and stores it in the redux store and in asyncstorage
export const authenticate = (body, type, redirectUrl) => {
  return async (dispatch) => {
    dispatch({ type: AUTHENTICATE_INIT });
    const authService = new AuthService();
    const response = await authService.loginUser(body);

    if (response.isSuccess) {
      await AsyncStorage.setItem("token", response.data.accessToken);
      dispatch({ type: AUTHENTICATE, payload: response.data.accessToken });

      // const redirectUrl = window.location.search
      //   ? window.location.search.split("=")[1]
      //   : "/";
      // window.location.href = redirectUrl;
    } else if (!response.isSuccess) {
      dispatch({ type: GLOBAL_ERROR, payload: response.errorMessage });
      dispatch({ type: AUTHENTICATE_ERROR, payload: response.errorMessage });
    }
  };
};

// gets the token from the cookie and saves it in the store
export const reauthenticate = (token) => {
  if (isTokenExpired(token)) {
    return async (dispatch) => {
      await AsyncStorage.removeItem("token");
      dispatch({ type: DEAUTHENTICATE });
    };
  }
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: token });
  };
};

// removing the token
export const deauthenticate = (route = "/") => {
  return (dispatch) => {
    // removeCookie("token");
    // Router.push(route);
    dispatch({ type: DEAUTHENTICATE });
  };
};

export default {
  authenticate,
  reauthenticate,
  deauthenticate,
};
