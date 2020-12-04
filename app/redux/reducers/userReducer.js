import {
  USER_PROFILE,
  USER_PROFILE_INIT,
  EDIT_ADDRESS,
  ADD_ADDRESS,
  TOGGLE_ACTIVE_ADDRESS,
  UPDATE_PROFILE_PICTURE,
  MY_PROFILE_REVIEWS,
} from "../types";

const initialState = {
  userProfile: null,
  editAddressResp: null,
  addAddressResp: null,
  toggleActiveAddResp: null,
  profilePictureResp: null,
  myReviews: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return { ...state, userProfile: action.payload, hasError: false };
    case USER_PROFILE_INIT:
      return { ...state, userProfile: null, hasError: false };
    case UPDATE_PROFILE_PICTURE:
      return { ...state, profilePictureResp: action.payload, hasError: false };
    case ADD_ADDRESS:
      return { ...state, addAddressResp: action.payload, hasError: false };
    case EDIT_ADDRESS:
      return { ...state, editAddressResp: action.payload, hasError: false };
    case TOGGLE_ACTIVE_ADDRESS:
      return { ...state, toggleActiveAddResp: action.payload, hasError: false };
    case MY_PROFILE_REVIEWS:
      return { ...state, myReviews: action.payload, hasError: false };
    default:
      return state;
  }
};
