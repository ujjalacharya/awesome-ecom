import { LATEST_PRODUCTS } from '../types';

const initialState = {
  latestproducts: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
  case LATEST_PRODUCTS:
    return { latestproducts: action.payload };
  default:
    return state;
  }
};
