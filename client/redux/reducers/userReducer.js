import { USER_PROFILE, USER_ERROR } from "../types";

const initialState = {
  userProfile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return { ...state, userProfile: action.payload, hasError: false };
    case USER_ERROR:
      return { ...state, userError: action.payload, hasError: true };
    default:
      return state;
  }
};
