import {
  USER_PROFILE,
  EDIT_ADDRESS,
  ADD_ADDRESS,
  TOGGLE_ACTIVE_ADDRESS,
  UPDATE_PROFILE_PICTURE,
  MY_PROFILE_REVIEWS,
  GET_REVIEWS_START,
  GET_USER_PROFILE_START
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
    case GET_REVIEWS_START:
      return { ...state, hasError: false, reviewLoading: true };
    case GET_USER_PROFILE_START:
      return { ...state, hasError: false, userProfileLoading: true };
    case USER_PROFILE:
      return { ...state, userProfile: action.payload, hasError: false, loading: false, userProfileLoading: false };
    case UPDATE_PROFILE_PICTURE:
      return { ...state, profilePictureResp: action.payload, hasError: false, loading: false };
    case ADD_ADDRESS:
      return { ...state, addAddressResp: action.payload, hasError: false, loading: false };
    case EDIT_ADDRESS:
      return { ...state, editAddressResp: action.payload, hasError: false, loading: false };
    case TOGGLE_ACTIVE_ADDRESS:
      return { ...state, toggleActiveAddResp: action.payload, hasError: false, loading: false };
    case MY_PROFILE_REVIEWS:
      return { ...state, myReviews: action.payload, hasError: false, reviewLoading: false };
    default:
      return state;
  }
};
