import { AUTHENTICATE, AUTHENTICATE_INIT, DEAUTHENTICATE, AUTHENTICATE_ERROR } from "../types";

const initialState = {
  token: null,
  tokenError: null,
  authLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_INIT:
      return { ...state, token: null, hasError: false, authLoading: true };
    case AUTHENTICATE:
      return { ...state, token: action.payload, hasError: false, authLoading: false };
    case DEAUTHENTICATE:
      return { ...state, token: null, hasError: false };
    case AUTHENTICATE_ERROR:
      return { ...state, tokenError: action.payload, hasError: true, authLoading: false };
    default:
      return state;
  }
};
