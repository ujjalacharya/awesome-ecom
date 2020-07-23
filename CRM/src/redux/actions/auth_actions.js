import { SIGN_IN, SIGN_OUT, AUTH_ERROR, LOAD_ME } from "../types";
import jwt from "jsonwebtoken";
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
const config = {
  headers: {
    "Content-Type": "application/json"
  }
};
export const loadMe = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const token = localStorage.getItem("token");
    const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SIGNIN_KEY);
    const { _id, name, email, role } = decoded;
    const payload = { _id, name, email }
    // dispatch({
    //   type: LOAD_ME,
    //   payload,
    //   role
    // });
  } catch (err) {
    console.log('****auth_actions/loadMe****', err);
    // dispatch({
    //   type: AUTH_ERROR
    // });
  }
};
export const signIn = (email,password) => async dispatch=> {
  const body = JSON.stringify({ email, password });
  // console.log('fdsgs');
  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/admin-auth/signin`, body, config);
    // console.log(res.data);
    dispatch({
      type: SIGN_IN,
      payload: res.data.accessToken
    });
    // dispatch(loadMe());
  } catch (err) {
    console.log('****auth_actions/signIn****',err);
    dispatch({
      type: AUTH_ERROR
    });
  }
}

export function signOut(data) {
  return {
    type: SIGN_OUT,
    payload: data,
  };
}
