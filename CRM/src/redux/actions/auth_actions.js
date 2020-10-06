import { SIGN_IN, SIGN_OUT, LOAD_ME, GLOBAL_ERROR, SAVE_SOCKET_USER } from "../types";
import api from "../../utils/api";
import { socket, disconnectSocket } from "../../utils/common";

export const loadMe = () => async (dispatch) => {
  try {
    const res = await api.get("admin-auth/load-me");
    dispatch({
      type: LOAD_ME,
      payload: res.data?.admin,
    });
  //make socket connection to the server
    let socketUser = socket()
    console.log(socketUser);
    dispatch({
      type: SAVE_SOCKET_USER,
      payload: socketUser
    })
    //todo reconnect if error..
    socketUser.on("tx", data => {
      console.log(data);
    });
    // socketUser.on("notification", data => {
    // console.log(data);  
    // });
  } catch (err) {
    console.log("****auth_actions/loadMe****", err);
  }
};

export const signIn = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await api.post(`/admin-auth/signin`, body);
    if (res && res.status === 200) {
      dispatch({
        type: SIGN_IN,
        payload: res.data,
      });
      dispatch(loadMe());
    }
  } catch (err) {
    console.log("****auth_actions/signIn****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found"  });
  }
};

export const signOut = () => async (dispatch) => {
  // const res = await api.get(`/superadmin/dispatchers?page=1&perPage=10`, {})
  // console.log(res,'main');
  try {
    dispatch({
      type: SIGN_OUT,
    });
    disconnectSocket()
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
