import { GLOBAL_ERROR, GET_ORDERS } from "../types";
import { OrderService } from "../services/orderService";

const getOrders = () => {
  return async (dispatch) => {
    const orderService = new OrderService();
    const response = await orderService.getOrders();
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

export default {
  getOrders,
};
