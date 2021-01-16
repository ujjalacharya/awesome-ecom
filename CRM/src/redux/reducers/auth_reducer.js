// import jwt from "jsonwebtoken";
import { SIGN_IN, SIGN_OUT, AUTH_ERROR, REFRESH_TOKEN, LOAD_ME,  UPDATE_USER, AUTH_TYPES} from "../types";
// import store from '../store'
// import api from '../../utils/api'
import { accessTokenKey, refreshTokenKey } from "../../utils/config";

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: false,
  user: null,
  hasError: false,
}


export default function (state = initialState, action) {
  const { type, payload} = action;
  switch (type) {
    case AUTH_TYPES.SIGN_IN_INIT:
        return {
          ...state,
          token: null,
          isAuth: null,
          loading: true
      };

    case REFRESH_TOKEN:
      case AUTH_TYPES.SIGN_IN_SUCCESS:
        console.log({payload})
        localStorage.setItem(accessTokenKey, payload.accessToken);
        localStorage.setItem(refreshTokenKey, payload.refreshToken);
        return {
          ...state,
          token: payload.accessToken,
          isAuth: true,
          loading: false
      };

      case AUTH_TYPES.SIGN_IN_FINISH:
        return {
          ...state,
          loading: false
      };

    case UPDATE_USER:
    case LOAD_ME:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload
      }
      case AUTH_ERROR:
      case SIGN_OUT:
      localStorage.removeItem(accessTokenKey);
      localStorage.removeItem(refreshTokenKey);
      return {
        ...state,
        token: "",
        isAuth: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
} 