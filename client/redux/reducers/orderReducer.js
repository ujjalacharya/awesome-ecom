import { GET_ORDERS, GET_ORDERS_STATUSES } from "../types";

const initialState = {
  getOrders: null,
  getOrdersStatus: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, getOrders: action.payload, hasError: false };
    case GET_ORDERS_STATUSES:
      return { ...state, getOrdersStatus: action.payload, hasError: false };
    default:
      return state;
  }
};
