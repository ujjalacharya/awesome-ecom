import { mutliProductCardSekelton, productDetailSkeleton } from "../../utils/skeletons";
import {
  LATEST_PRODUCTS,
  PRODUCT_DETAILS,
  PRODUCT_QA,
  POST_QUESTION,
  PRODUCT_REVIEWS,
  POST_PRODUCT_REVIEWS,
  PRODUCT_DETAILS_START,
  PRODUCT_DETAILS_FINISH,
  TRENDING_PRODUCTS,
  TOP_SELLING_PRODUCTS,
  MOST_VIEWED_PRODUCTS,
  FEATURED_PRODUCTS,
  GET_PRODUCTS_START,
  TRENDING_PRODUCTS_START,
  LATEST_PRODUCTS_START,
  TOP_SELLING_PRODUCTS_START,
  MOST_VIEWED_PRODUCTS_START,
  FEATURED_PRODUCTS_START,
} from "../types";

const initialState = {
  latestProducts: null,
  productDetails: { product: {} },
  hasError: false,
  latestLoading: false,
  productQA: null,
  postQnsResp: null,
  productReviews: null,
  postReviewResp: null,
  productDetailsLoading: false,
  trendingProducts: null,
  trendingLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_START:
      return {
        ...state,
        latestProducts: mutliProductCardSekelton,
        trendingProducts: mutliProductCardSekelton,
        topSellingProducts: mutliProductCardSekelton,
        mostViewedProducts: mutliProductCardSekelton,
        featuredProducts: mutliProductCardSekelton,
        hasError: false,
      };
    case LATEST_PRODUCTS:
      return {
        ...state,
        latestProducts: action.payload,
        hasError: false,
        latestLoading: false,
      };
    case LATEST_PRODUCTS_START:
      return {
        ...state,
        latestProducts: mutliProductCardSekelton,
        latestLoading: true,
        hasError: false,
      };
    case TRENDING_PRODUCTS_START:
      return {
        ...state,
        trendingProducts: mutliProductCardSekelton,
        trendingLoading: true,
        hasError: false,
      };
    case TRENDING_PRODUCTS:
      return {
        ...state,
        trendingProducts: action.payload,
        hasError: false,
        trendingLoading: false,
      };
    case TOP_SELLING_PRODUCTS_START:
      return {
        ...state,
        topSellingProducts: mutliProductCardSekelton,
        topSellingLoading: true,
        hasError: false,
      };
    case TOP_SELLING_PRODUCTS:
      return {
        ...state,
        topSellingProducts: action.payload,
        hasError: false,
        topSellingLoading: false,
      };
    case MOST_VIEWED_PRODUCTS_START:
      return {
        ...state,
        mostViewedProducts: mutliProductCardSekelton,
        mostViewedLoading: true,
        hasError: false,
      };
    case MOST_VIEWED_PRODUCTS:
      return {
        ...state,
        mostViewedProducts: action.payload,
        hasError: false,
        mostViewedLoading: false,
      };
    case FEATURED_PRODUCTS_START:
      return {
        ...state,
        featuredProducts: mutliProductCardSekelton,
        featuredLoading: true,
        hasError: false,
      };
    case FEATURED_PRODUCTS:
      return {
        ...state,
        featuredProducts: action.payload,
        hasError: false,
        featuredLoading: false,
      };
    case PRODUCT_DETAILS_START:
      return { ...state, productDetailsLoading: true, productDetails: { product: productDetailSkeleton }, hasError: false };
    case PRODUCT_DETAILS_FINISH:
      return { ...state, productDetailsLoading: false, hasError: false };
    case PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload, hasError: false };
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
