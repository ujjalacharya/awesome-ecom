import { SIGN_IN, SIGN_OUT, AUTH_ERROR, LOAD_ME, GLOBAL_ERROR } from "../types";
import api from "../../utils/api";

export const loadMe = () => async (dispatch) => {
  try {
    const res = await api.get("admin-auth/load-me");
    dispatch({
      type: LOAD_ME,
      payload: res.data?.admin,
    });
  } catch (err) {
    console.log("****auth_actions/loadMe****", err);
    dispatch({
      type: AUTH_ERROR,
    });
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
    }else{
      console.log('****res****',res);
      dispatch({ type: GLOBAL_ERROR, payload: res || "Not Found" });
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
    window.location.href = "/"
  } catch (err) {
    console.log("****auth_actions/signOut****", err);
  }
};

export default {
  loadMe,
  signIn,
  signOut,
};
