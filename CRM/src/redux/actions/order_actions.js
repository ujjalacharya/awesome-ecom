import { GLOBAL_ERROR, GET_ORDERS, GET_ORDER, MULTI_ORDER_LOADING, SINGLE_ORDER_LOADING, TOGGLE_ORDER_APPROVAL, SUCCESS, TOGGLE_TOBERETURN_ORDER, CANCEL_ORDER } from "../types";
import api from "../../utils/api";


export const getOrders = (id,page,perPage,status='', keyword='') => async (dispatch) => {
  try {
    dispatch({type:MULTI_ORDER_LOADING})
    const res = await api.get(`/order/orders/${id}?page=${page}&perPage=${perPage}&status=${status}&keyword=${keyword}`);
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    console.log("****order_actions/getOrders****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
  }
};

export const getOrder = (id,order_id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_ORDER_LOADING })
    const res = await api.get(`/order/admin-order/${id}/${order_id}`);
    dispatch({
      type: GET_ORDER,
      payload: res.data,
    });
  } catch (err) {
    console.log("****order_actions/getOrder****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
  }
};

export const toggleOrderApproval = (id, order_id) => async (dispatch) => {
  try {
    const res = await api.patch(`/order/toggle-order-approval/${id}/${order_id}`);
    dispatch({
      type: TOGGLE_ORDER_APPROVAL,
      payload: res.data,
    });
    dispatch({
      type: SUCCESS,
      payload: 'Toggled order approval successfully.',
    });
  } catch (err) {
    console.log("****order_actions/toggleOrderApproval****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
  }
};

export const toggletobeReturnOrder = (id, order_id) => async (dispatch) => {
  try {
    const res = await api.patch(`/order/toggle-order-to-get-return/${id}/${order_id}`);
    dispatch({
      type: TOGGLE_TOBERETURN_ORDER,
      payload: res.data,
    });
    dispatch({
      type: SUCCESS,
      payload: `Order status has sucessfully changed to ${res.data.order.status.currentStatus}`,
    });
  } catch (err) {
    console.log("****order_actions/toggletobeReturnOrder****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
  }
};

export const cancelOrder = (id, order_id) => async (dispatch) => {
  try {
    const res = await api.patch(`/order/cancel-order/${id}/${order_id}`);
    dispatch({
      type: CANCEL_ORDER,
      payload: res.data,
    });
    dispatch({
      type: SUCCESS,
      payload: 'Order cancelled sucessfully',
    });
  } catch (err) {
    console.log("****order_actions/orderCancel****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
  }
};

