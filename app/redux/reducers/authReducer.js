import { AUTHENTICATE, DEAUTHENTICATE, AUTHENTICATE_ERROR } from "../types";

const initialState = {
  token: "null",
  tokenError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...state, token: action.payload, hasError: false };
    case DEAUTHENTICATE:
      return { ...state, token: null, hasError: false };
    case AUTHENTICATE_ERROR:
      return { ...state, tokenError: action.payload, hasError: true };
    default:
      return state;
  }
};
