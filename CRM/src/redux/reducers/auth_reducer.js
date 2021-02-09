// import jwt from "jsonwebtoken";
import { UPDATE_USER, AUTH_TYPES, BEING_ADMIN, BEING_SUPERADMIN, UPDATE_ADMIN_TYPES } from "../types";
// import store from '../store'
// import api from '../../utils/api'
import { accessTokenKey, persistAdminProfile, refreshTokenKey } from "../../utils/config";

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: false,
  authUser: null,
  adminProfile: JSON.parse(localStorage.getItem(persistAdminProfile))  || null
}


export default function (state = initialState, action) {
  const { type, payload } = action;
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
    case UPDATE_ADMIN_TYPES.UPDATE_ADMIN_INIT:
      return {
        ...state,
        loading:true
      }
    case UPDATE_ADMIN_TYPES.UPDATE_ADMIN_FINISH:
    case AUTH_TYPES.SIGN_IN_FINISH:
      return {
        ...state,
        loading: false
      };

    case UPDATE_ADMIN_TYPES.UPDATE_ADMIN:
      return {
        ...state,
        adminProfile: payload
      }
    case AUTH_TYPES.LOAD_ME:
      return {
        ...state,
        // isAuth: true,
        loading: false,
        authUser: payload,
        adminProfile: payload.role === 'admin' ? payload : state.adminProfile
      }
    case BEING_ADMIN:
      localStorage.setItem(persistAdminProfile,JSON.stringify(payload))
      return {
        ...state,
        adminProfile: payload
      }
    case BEING_SUPERADMIN:
      localStorage.removeItem(persistAdminProfile)
      return {
        ...state,
        adminProfile: null
      }
    case AUTH_TYPES.AUTH_ERROR:
    case AUTH_TYPES.SIGN_OUT:
      localStorage.removeItem(accessTokenKey);
      localStorage.removeItem(refreshTokenKey);
      localStorage.removeItem(persistAdminProfile)
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