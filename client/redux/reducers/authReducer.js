import { AUTHENTICATE, DEAUTHENTICATE, AUTHENTICATE_ERROR, AUTHENTICATE_START, REGISTER_START, REGISTER_FINISH, AUTHENTICATE_FINISH, RESET_PASSWORD } from "../types";

const initialState = {
  token: null,
  tokenError: null,
  forgotPasswordResp: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_START:
      return { ...state, hasError: false, loading: true };
    case AUTHENTICATE_FINISH:
      return { ...state, hasError: false, loading: false };
    case REGISTER_START:
      return { ...state, hasError: false, loading: true };
    case REGISTER_FINISH:
      return { ...state, hasError: false, loading: false };
    case AUTHENTICATE:
      return { ...state, token: action.payload, hasError: false, loading: false };
    case RESET_PASSWORD:
      return { ...state, forgotPasswordResp: action.payload, loading:false };
    case DEAUTHENTICATE:
      return { ...state, token: null, hasError: false };
    case AUTHENTICATE_ERROR:
      return { ...state, tokenError: action.payload, hasError: true };
    default:
      return state;
  }
};
