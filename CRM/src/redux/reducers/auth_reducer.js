import { SIGN_IN, SIGN_OUT } from "../types";

const localSt = localStorage.getItem("token");

const initialState = localSt
  ? { isAuth: false, token: localSt,role:'superadmin' ,loading:true}
  : { isAuth: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        token: "dummy_token",
        isAuth: true,
        loading:false
      };
    case SIGN_OUT:
      return {
        ...state,
        auth: {
          token: "",
          isAuth: false,
          loading:true
        },
      };
    default:
      return state;
  }
}
