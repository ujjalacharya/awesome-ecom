import { USER_PROFILE, USER_ERROR, EDIT_ADDRESS, ADD_ADDRESS } from "../types";

const initialState = {
  userProfile: null,
  editAddressResp: null,
  addAddressResp: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return { ...state, userProfile: action.payload, hasError: false };
    case ADD_ADDRESS:
      return { ...state, addAddressResp: action.payload, hasError: false };
    case EDIT_ADDRESS:
      return { ...state, editAddressResp: action.payload, hasError: false };
    case USER_ERROR:
      return { ...state, userError: action.payload, hasError: true };
    default:
      return state;
  }
};
