import {
  AUTHENTICATE,
  AUTHENTICATE_INIT,
  DEAUTHENTICATE,
  AUTHENTICATE_ERROR,
  GLOBAL_ERROR,
  USER_PROFILE_INIT,
  USER_INITIAL_STATE,
} from "../types";
import { decodeToken, isTokenExpired } from "../../utils/common";
import { AuthService } from "../services/authService";
import { AsyncStorage } from "react-native";
import { getUserProfile } from "./userActions";

// gets token from the api and stores it in the redux store and in asyncstorage
export const authenticate = (body, type, redirectUrl) => {
  return async (dispatch) => {
    dispatch({ type: AUTHENTICATE_INIT });
    dispatch({ type: USER_PROFILE_INIT });
    const authService = new AuthService();
    const response = await authService.loginUser(body);

    if (response.isSuccess) {
      await AsyncStorage.setItem("token", response.data.accessToken);
      dispatch({ type: AUTHENTICATE, payload: response.data.accessToken });
      const _id = decodeToken(response.data.accessToken);
      dispatch(getUserProfile(_id));
    } else if (!response.isSuccess) {
      dispatch({ type: GLOBAL_ERROR, payload: response.errorMessage });
      dispatch({ type: AUTHENTICATE_ERROR, payload: response.errorMessage });
    }
  };
};

// gets the token from the cookie and saves it in the store
export const reauthenticate = (token) => {
  if (isTokenExpired(token)) {
    return (dispatch) => {
      dispatch(deauthenticate());
    };
  }
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: token });
    const _id = decodeToken(token);
    dispatch(getUserProfile(_id));
  };
};

// removing the token
export const deauthenticate = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: USER_INITIAL_STATE });
    dispatch({ type: DEAUTHENTICATE });
  };
};

export default {
  authenticate,
  reauthenticate,
  deauthenticate,
};
