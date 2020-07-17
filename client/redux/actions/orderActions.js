import { GLOBAL_ERROR, GET_ORDERS, GET_ORDERS_STATUSES, PLACE_ORDER } from "../types";
import { OrderService } from "../services/orderService";

const getOrders = (query) => {
  return async (dispatch) => {
    const orderService = new OrderService();
    const response = await orderService.getOrders(query);
    if (response.isSuccess) {
      dispatch({ type: GET_ORDERS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getOrdersStatuses = () => {
  return async (dispatch) => {
    const orderService = new OrderService();
    const response = await orderService.getOrdersStatuses();
    if (response.isSuccess) {
      dispatch({ type: GET_ORDERS_STATUSES, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const placeOrder = (body) => {
  return async (dispatch) => {
    const orderService = new OrderService();
    const response = await orderService.placeOrder(body);
    if (response.isSuccess) {
      dispatch({ type: PLACE_ORDER, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

export default {
  getOrders,
  getOrdersStatuses,
  placeOrder
};
