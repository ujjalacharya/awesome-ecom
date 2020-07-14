import { SIGN_IN, SIGN_OUT } from "../types";

export default function (state={auth: {isAuth: false}}, action) {
  switch (action.type) {
    case SIGN_IN:
      localStorage.setItem("token", "dummy_token")
      return {
        ...state,
        auth: {
          token: localStorage.getItem("token"),
          isAuth: true,
        },
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
