import { SIGN_IN, SIGN_OUT } from "../types";

const localSt = localStorage.getItem("token");

const initialState = localSt
  ? { isAuth: true, token: localSt }
  : { isAuth: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        token: "dummy_token",
        isAuth: true,
      };
    case SIGN_OUT:
      return {
        ...state,
        auth: {
          token: "",
          isAuth: false,
        },
      };
    default:
      return state;
  }
}
