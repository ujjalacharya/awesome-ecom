import {
  LATEST_PRODUCTS,
  PRODUCT_DETAILS,
  PRODUCT_DETAILS_LOADING,
  LATEST_LOADING,
  PRODUCT_QA,
  POST_QUESTION,
  PRODUCT_REVIEWS,
  POST_PRODUCT_REVIEWS,
} from "../types";

const initialState = {
  latestProducts: {},
  productDetails: null,
  hasError: false,
  latestLoading: false,
  productDetailsLoading: false,
  productQA: null,
  postQnsResp: null,
  productReviews: null,
  postReviewResp: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LATEST_PRODUCTS:
      return {
        ...state,
        latestProducts: action.payload,
        hasError: false,
        latestLoading: false,
      };
    case LATEST_LOADING:
      return {
        ...state,
        latestProducts: action.payload,
        latestLoading: true,
        hasError: false,
      };
    case PRODUCT_DETAILS_LOADING:
      return {
        ...state,
        productDetails: null,
        productDetailsLoading: true,
        hasError: false,
      };
    case PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
        hasError: false,
        productDetailsLoading: false,
      };
    case PRODUCT_QA:
      return { ...state, productQA: action.payload, hasError: false };
    case POST_QUESTION:
      return { ...state, postQnsResp: action.payload, hasError: false };
    case PRODUCT_REVIEWS:
      return { ...state, productReviews: action.payload, hasError: false };
    case POST_PRODUCT_REVIEWS:
      return { ...state, postReviewResp: action.payload, hasError: false };
    default:
      return state;
  }
};
