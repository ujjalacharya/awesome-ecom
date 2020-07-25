import { SIGN_IN, SIGN_OUT, AUTH_ERROR} from "../types";
import jwt from "jsonwebtoken";

function parseToken(token) {
  try {
    let verifiedToken = jwt.verify(token, process.env.REACT_APP_JWT_SIGNIN_KEY);
    if (verifiedToken.role !== 'admin' && verifiedToken.role !== 'superadmin') {
      localStorage.removeItem("token");
      return null
    }
    return verifiedToken

  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
}

const renderInitial = (tok) => {
  const token = tok || localStorage.getItem("token");
  const decoded = parseToken(token);
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

const initialState = renderInitial();


export default function (state = initialState, action) {
  const { type, payload} = action;
  switch (type) {
    case SIGN_IN:
      localStorage.setItem("token", payload);
      const parsedInitial = renderInitial(payload);

      return {
        ...state,
        ...parsedInitial,
      };
    case AUTH_ERROR:
    case SIGN_OUT:
      localStorage.removeItem("token");
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
