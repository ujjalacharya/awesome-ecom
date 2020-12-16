import { GET_ORDERS, GET_ORDERS_STATUSES, PLACE_ORDER, GET_SHIPPING_CHARGE, GET_ORDER_BY_ID, CANCEL_ORDER, GET_ORDERS_START, GET_ORDERS_BY_ID_START } from "../types";

const initialState = {
  getOrders: null,
  getOrdersStatus: null,
  placeOrderResp: null,
  getShippingChargeResp: null,
  cancelOrderResp: null,
  getOrderByIdResp: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_START:
      return { ...state, hasError: false, loading: true };
    case GET_ORDERS_BY_ID_START:
      return { ...state, hasError: false, orderByIdLoading: true };
    case GET_ORDERS:
      return { ...state, getOrders: action.payload, loading: false, hasError: false, };
    case GET_ORDER_BY_ID:
      return { ...state, getOrderByIdResp: action.payload, orderByIdLoading: false };
    case GET_ORDERS_STATUSES:
      return { ...state, getOrdersStatus: action.payload };
    case PLACE_ORDER:
      return { ...state, placeOrderResp: action.payload };
    case CANCEL_ORDER:
      return { ...state, cancelOrderResp: action.payload };
    case GET_SHIPPING_CHARGE:
      return { ...state, getShippingChargeResp: action.payload };
    default:
      return state;
  }
};
