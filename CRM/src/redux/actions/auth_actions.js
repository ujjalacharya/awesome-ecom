import {
  SAVE_SOCKET_USER,
  AUTH_TYPES,
} from "../types";
import { socket, disconnectSocket } from "../../utils/common";
import { finish, init, success, error } from "../commonActions";
import { AuthService } from "../api/auth_api";

const authService = new AuthService();

export const loadMe = () => async (dispatch) => {
  const response = await authService.loadMe();  
  if (response.isSuccess) {
    dispatch(success(AUTH_TYPES.LOAD_ME, response.data.admin));
    //make socket connection to the server
    let socketUser = socket();
    dispatch({
      type: SAVE_SOCKET_USER,
      payload: socketUser,
    });
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
  };

export const signIn = (email, password) => async (dispatch) => {
  dispatch(init(AUTH_TYPES.SIGN_IN));

  const response = await authService.loginUser(email, password);

  dispatch(finish(AUTH_TYPES.SIGN_IN));

  if (response.isSuccess) {
    dispatch(success(AUTH_TYPES.SIGN_IN, response.data));
    dispatch(loadMe());
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const signOut = () => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_TYPES.SIGN_OUT,
    });
    disconnectSocket();
    // window.location.href = "/"
  } catch (err) {
    console.log("****auth_actions/signOut****", err);
  }
};

export default {
  loadMe,
  signIn,
  signOut,
};
