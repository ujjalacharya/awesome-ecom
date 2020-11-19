import { GET_BANNER_IMAGES } from "../types";

const initialState = {
  getBannerImages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BANNER_IMAGES:
      return { ...state, getBannerImages: action.payload, hasError: false };
    default:
      return state;
  }
};
