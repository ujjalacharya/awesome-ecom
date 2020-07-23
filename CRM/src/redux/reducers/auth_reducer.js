import { SIGN_IN, SIGN_OUT, AUTH_ERROR, LOAD_ME } from "../types";
import jwt from "jsonwebtoken";

function parseToken(token) {
  try {
    return jwt.verify(token, process.env.REACT_APP_JWT_SIGNIN_KEY);
  } catch (error) {
    return null;
  }
}

const token = localStorage.getItem("token");
const decoded = parseToken(token);

const initialState = {
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

// const initialState = {
//   token:null,
//   isAuth: false,
//   loading: true,
//   user:null,
//   role:''
// }

export default function (state = initialState, action) {
  const { type, payload, role } = action;
  switch (type) {
    case SIGN_IN:
      localStorage.setItem("token", payload);
      const decoded = parseToken(payload);

      return {
        ...state,
        token: payload,
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
    case LOAD_ME:
      return {
        ...state,
        user: payload,
        isAuth: true,
        loading: false,
        role,
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
      };
    default:
      return state;
  }
}
