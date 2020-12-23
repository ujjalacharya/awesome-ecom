import Router from "next/router";
import {
  AUTHENTICATE,
  DEAUTHENTICATE,
  AUTHENTICATE_START,
  GLOBAL_ERROR,
  REGISTER_FINISH,
  REGISTER_START,
  RESET_PASSWORD,
  AUTHENTICATE_FINISH
} from "../types";
import { setCookie, removeCookie } from "../../utils/cookie";
import { isTokenExpired, openNotification } from "../../utils/common";
import { AuthService } from "../services/authService";

//register the user
const register = (body) => {
  return async (dispatch) => {
    await dispatch({ type: REGISTER_START });
    const authService = new AuthService();
    const response = await authService.registerUser(body);
    await dispatch({ type: REGISTER_FINISH });
    if (response.isSuccess) {
      openNotification("Success", "User registered successfully");

      window.location.href = '/login';
    } else if (!response.isSuccess) {
      dispatch({ type: GLOBAL_ERROR, payload: response.errorMessage });
    }
  };
};


// reset password
const sendResendPasswordLink = (body, data, setData) => {
  return async (dispatch) => { 
    setData({...data, loading: true, success: false})

    const authService = new AuthService();
    const response = await authService.sendResendPasswordLink(body);

    if (response.isSuccess) {
      setData({...data, loading: false, success: true, data: response.data})
      
    } else if (!response.isSuccess) {
      dispatch({ type: GLOBAL_ERROR, payload: response.errorMessage });
    }
  };
};

// reset password
const resetMyPassword = (body, data, setData) => {
  return async (dispatch) => { 
    setData({...data, loading: true, success: false})

    const authService = new AuthService();
    const response = await authService.resetMyPassword(body);

    if (response.isSuccess) {
      setData({...data, loading: true, success: true, data: response.data})
      openNotification("Success", "Password reset successfully");

      window.location.href = '/login';
      
    } else if (!response.isSuccess) {
      setData({...data, loading: false, success: false})
      dispatch({ type: GLOBAL_ERROR, payload: response.errorMessage });
    }
  };
};

// gets token from the api and stores it in the redux store and in cookie
const authenticate = (body, type, redirectUrl) => {
  return async (dispatch) => {
    await dispatch({ type: AUTHENTICATE_START });

    const authService = new AuthService();
    const response = await authService.loginUser(body);

    await dispatch({ type: AUTHENTICATE_FINISH });
    if (response.isSuccess) {
      setCookie("token", response.data.accessToken);
      dispatch({ type: AUTHENTICATE, payload: response.data.token });

      const redirectUrl = window.location.search
        ? window.location.search.split("=")[1]
        : "/";
      window.location.href = redirectUrl;
    } else if (!response.isSuccess) {
      dispatch({ type: GLOBAL_ERROR, payload: response.errorMessage });
    }
  };
};

// gets token from the api and stores it in the redux store and in cookie
const authenticateSocialLogin = (body) => {
  return async (dispatch) => {
    await dispatch({ type: AUTHENTICATE_START });

    const authService = new AuthService();
    const response = await authService.loginUserSocialLogin(body);

    await dispatch({ type: AUTHENTICATE_FINISH });
    
    if (response.isSuccess) {
      setCookie("token", response.data.accessToken);
      dispatch({ type: AUTHENTICATE, payload: response.data.token });

      const redirectUrl = window.location.search
        ? window.location.search.split("=")[1]
        : "/";
      window.location.href = redirectUrl;
    } else if (!response.isSuccess) {
      // dispatch({ type: GLOBAL_ERROR, payload: response.errorMessage });
    }
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
  if (isTokenExpired(token)) {
    return (dispatch) => {
      removeCookie("token");
      dispatch({ type: DEAUTHENTICATE });
    };
  }
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: token });
  };
};

// removing the token
const deauthenticate = (route = "/") => {
  return (dispatch) => {
    removeCookie("token");
    Router.push(route);
    dispatch({ type: DEAUTHENTICATE });
  };
};

export default {
  authenticate,
  reauthenticate,
  deauthenticate,
  register,
  authenticateSocialLogin,
  sendResendPasswordLink,
  resetMyPassword
};
