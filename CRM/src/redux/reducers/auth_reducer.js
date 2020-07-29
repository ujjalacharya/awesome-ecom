import jwt from "jsonwebtoken";
import { SIGN_IN, SIGN_OUT, AUTH_ERROR, REFRESH_TOKEN, LOAD_ME} from "../types";
import store from '../store'
import api from '../../utils/api'

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null
}


export default function (state = initialState, action) {
  const { type, payload} = action;
  switch (type) {
    case REFRESH_TOKEN:
      case SIGN_IN:
        localStorage.setItem("token", payload.accessToken);
        localStorage.setItem("refreshToken", payload.refreshToken);
        return {
          ...state,
          token: payload.accessToken,
          isAuth: true,
          loading: false
      };
    case LOAD_ME:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload
      }
      case AUTH_ERROR:
      case SIGN_OUT:
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        token: "",
        isAuth: false,
        loading: true,
        user: null,
      };
    default:
      return state;
  }
} 