import {
  USER_PROFILE,
  USER_ERROR,
  EDIT_ADDRESS,
  ADD_ADDRESS,
  TOGGLE_ACTIVE_ADDRESS,
  UPDATE_PROFILE_PICTURE,
} from "../types";

const initialState = {
  userProfile: null,
  editAddressResp: null,
  addAddressResp: null,
  toggleActiveAddResp: null,
  profilePictureResp: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return { ...state, userProfile: action.payload, hasError: false };
    case UPDATE_PROFILE_PICTURE:
      return { ...state, profilePictureResp: action.payload, hasError: false };
    case ADD_ADDRESS:
      return { ...state, addAddressResp: action.payload, hasError: false };
    case EDIT_ADDRESS:
      return { ...state, editAddressResp: action.payload, hasError: false };
    case TOGGLE_ACTIVE_ADDRESS:
      return { ...state, toggleActiveAddResp: action.payload, hasError: false };
    default:
      return state;
  }
};
