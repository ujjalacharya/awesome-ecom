import { GET_BANNER_IMAGES, SUBSCRIBE_LEAD, SUBSCRIBE_LEAD_START, SUBSCRIBE_LEAD_FINISH } from "../types";

const initialState = {
  getBannerImages: null,
  subscribeLeadLoading: false,
  subscribeLead: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BANNER_IMAGES:
      return { ...state, getBannerImages: action.payload, hasError: false };
    case SUBSCRIBE_LEAD_START:
      return { ...state, subscribeLeadLoading: true };
    case SUBSCRIBE_LEAD_FINISH:
      return { ...state, subscribeLeadLoading: false };
    case SUBSCRIBE_LEAD:
      return { ...state, subscribeLeadLoading: false, subscribeLead: action.payload };
    default:
      return state;
  }
};
