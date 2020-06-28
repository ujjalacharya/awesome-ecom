import { AUTHENTICATE, DEAUTHENTICATE } from '../types';

const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
  case AUTHENTICATE:
    return { ...state, token: action.payload };
  case DEAUTHENTICATE:
    return { ...state, token: null };
  default:
    return state;
  }
};
