// import jwt from "jsonwebtoken";
import { UPDATE_USER, AUTH_TYPES} from "../types";
// import store from '../store'
// import api from '../../utils/api'
import { accessTokenKey, refreshTokenKey } from "../../utils/config";

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: false,
  authUser: null,
  adminProfile: null
}


export default function (state = initialState, action) {
  const { type, payload} = action;
  switch (type) {
    case AUTH_TYPES.SIGN_IN_INIT:
        return {
          ...state,
          token: "",
          isAuth: null,
          loading: true,
          authUser: null
      };

    case AUTH_TYPES.REFRESH_TOKEN:
    case AUTH_TYPES.SIGN_IN:
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
    case AUTH_TYPES.LOAD_ME:
      return {
        ...state,
        isAuth: true,
        loading: false,
        authUser: payload,
        adminProfile: payload.role === 'admin' ? payload : null
      }
      case AUTH_TYPES.AUTH_ERROR:
      case AUTH_TYPES.SIGN_OUT:
      localStorage.removeItem(accessTokenKey);
      localStorage.removeItem(refreshTokenKey);
      return {
        ...state,
        token: "",
        isAuth: false,
        loading: false,
        authUser: null,
        adminProfile: null
      };
    default:
      return state;
  }
} 