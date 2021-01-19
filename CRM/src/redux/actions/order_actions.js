import { SUCCESS, CANCEL_ORDER_TYPES , ORDERS_TYPES, ORDER_TYPES,TOGGLE_ORDER_APPROVAL_TYPES, TOGGLE_TOBERETURN_ORDER_TYPES} from "../types";
import { finish, init, success, error } from "../commonActions";
import { OrderService } from "../api/order_api";

const orderService = new OrderService();

export const getOrders = (id,page,perPage,status, keyword) => async (dispatch) => {
  dispatch(init(ORDERS_TYPES.GET_ORDERS));

  const response = await orderService.getOrders(id,page,perPage,status, keyword);

  dispatch(finish(ORDERS_TYPES.GET_ORDERS));

  if (response.isSuccess) {
    dispatch(success(ORDERS_TYPES.GET_ORDERS, response.data));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const getOrder = (id,order_id) => async (dispatch) => {
  dispatch(init(ORDER_TYPES.GET_ORDER));

  const response = await orderService.getOrder(id,order_id);

  dispatch(finish(ORDER_TYPES.GET_ORDER));

  if (response.isSuccess) {
    dispatch(success(ORDER_TYPES.GET_ORDER, response.data));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const toggleOrderApproval = (id, order_id) => async (dispatch) => {
  dispatch(init(TOGGLE_ORDER_APPROVAL_TYPES.TOGGLE_ORDER_APPROVAL));

  const response = await orderService.toggleOrderApproval(id,order_id);

  dispatch(finish(TOGGLE_ORDER_APPROVAL_TYPES.TOGGLE_ORDER_APPROVAL));

  if (response.isSuccess) {
    dispatch(success(TOGGLE_ORDER_APPROVAL_TYPES.TOGGLE_ORDER_APPROVAL, response.data));
    dispatch(success(SUCCESS, `Order status has sucessfully changed to ${response.data.status.currentStatus}`));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const toggletobeReturnOrder = (id, order_id, remark, returnedAmount ) => async (dispatch) => {
  dispatch(init(TOGGLE_TOBERETURN_ORDER_TYPES.TOGGLE_TOBERETURN_ORDER));

  const response = await orderService.toggletobeReturnOrder(id, order_id, remark, returnedAmount );

  dispatch(finish(TOGGLE_TOBERETURN_ORDER_TYPES.TOGGLE_TOBERETURN_ORDER));

  if (response.isSuccess) {
    dispatch(success(TOGGLE_TOBERETURN_ORDER_TYPES.TOGGLE_TOBERETURN_ORDER, response.data));
    dispatch(success(SUCCESS, `Order status has sucessfully changed to ${response.data.status.currentStatus}`));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const cancelOrder = (id, order_id, remark) => async (dispatch) => {
  dispatch(init(CANCEL_ORDER_TYPES.CANCEL_ORDER));

  const response = await orderService.cancelOrder(id, order_id, remark );

  dispatch(finish(CANCEL_ORDER_TYPES.CANCEL_ORDER));

  if (response.isSuccess) {
    dispatch(success(CANCEL_ORDER_TYPES.CANCEL_ORDER, response.data));
    dispatch(success(SUCCESS, 'Order cancelled sucessfully'));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

