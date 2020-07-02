import Router from "next/router";
import axios from "axios";
import { AUTHENTICATE, DEAUTHENTICATE } from "../types";
import { setCookie, removeCookie } from "../../utils/cookie";
import { isTokenExpired } from "../../utils/common";

// gets token from the api and stores it in the redux store and in cookie
const authenticate = (body, type) => {
  if (type !== "signin" && type !== "signup") {
    throw new Error("Wrong API call!");
  }
  return (dispatch) => {
    axios
      .post(`${process.env.SERVER_BASE_URL}/api/user-auth/signin`, body)
      .then((response) => {
        setCookie("token", response.data.accessToken);
        dispatch({ type: AUTHENTICATE, payload: response.data.token });
        window.location.href = "/";
      })
      .catch((err) => {
        throw new Error(err);
      });
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
};
