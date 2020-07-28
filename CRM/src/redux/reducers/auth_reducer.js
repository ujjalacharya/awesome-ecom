import jwt from "jsonwebtoken";
import { SIGN_IN, SIGN_OUT, AUTH_ERROR, REFRESH_TOKEN} from "../types";
import store from '../store'
import api from '../../utils/api'
async function parseToken(token) {
  try {
    let verifiedToken = jwt.verify(token, process.env.REACT_APP_JWT_SIGNIN_KEY);
    //verify role
    if (verifiedToken.role !== 'admin' && verifiedToken.role !== 'superadmin') {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return null
    }
    return verifiedToken
    
  } catch (error) {
    
    if (error.message === 'jwt expired') {
      // call for refresh token if jwt has expired
      (async () => {
        const body = JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') });
        const res = await api.post(`/admin-auth/refresh-token`, body)
        store.dispatch({
          type: REFRESH_TOKEN,
          payload: res.data
        });
        api.defaults.headers.common["x-auth-token"] = res.data.accessToken
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        let verifiedToken = jwt.verify(res.data.accessToken, process.env.REACT_APP_JWT_SIGNIN_KEY);
        return verifiedToken
      })()
    }
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    return null;
  }
}

const renderInitial = async (tok) => {
  const token = tok || localStorage.getItem("token");
  const decoded = await parseToken(token);
  return {
    token: localStorage.getItem("token"),
    isAuth: decoded !== null ? true : null,
    loading: decoded !== null ? false : true,
    user:
    decoded !== null
    ? {
      _id: decoded._id,
      name: decoded.name,
      email: decoded.email,
    }
    : null,
    role: decoded !== null ? decoded.role : null,
  };
};

const initialState =  renderInitial();


export default function (state = initialState, action) {
  const { type, payload} = action;
  switch (type) {
    case REFRESH_TOKEN:
      case SIGN_IN:
        localStorage.setItem("token", payload.accessToken);
        localStorage.setItem("refreshToken", payload.refreshToken);
        const parsedInitial = renderInitial(payload.accessToken);
        
        return {
          ...state,
          ...parsedInitial,
      };
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
        role:null
      };
    default:
      return state;
  }
} 