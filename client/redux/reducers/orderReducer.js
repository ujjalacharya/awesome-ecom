import { GET_ORDERS } from "../types";

const initialState = {
    getOrders: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, getOrders: action.payload, hasError: false };
    default:
      return state;
  }
};
