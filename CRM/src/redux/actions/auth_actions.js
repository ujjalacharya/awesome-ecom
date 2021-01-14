import {
  SIGN_OUT,
  LOAD_ME,
  GLOBAL_ERROR,
  SAVE_SOCKET_USER,
  AUTH_TYPES,
} from "../types";
import api from "../../utils/api";
import { socket, disconnectSocket } from "../../utils/common";
import { finish, init, success, error } from "../commonActions";
import { AuthService } from "../api/auth_api";

const authService = new AuthService();

export const loadMe = () => async (dispatch) => {
  try {
    const res = await api.get("admin-auth/load-me");
    dispatch({
      type: LOAD_ME,
      payload: res.data?.admin,
    });
    //make socket connection to the server
    let socketUser = socket();
    dispatch({
      type: SAVE_SOCKET_USER,
      payload: socketUser,
    });
    //todo reconnect if error..
    // socketUser.on("tx", data => {
    //   console.log(data);
    // });
  } catch (err) {
    console.log("****auth_actions/loadMe****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
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
  // const res = await api.get(`/superadmin/dispatchers?page=1&perPage=10`, {})
  // console.log(res,'main');
  try {
    dispatch({
      type: SIGN_OUT,
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
