import { GLOBAL_ERROR, GET_ORDERS, GET_ORDER, MULTI_ORDER_LOADING, SINGLE_ORDER_LOADING } from "../types";
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

