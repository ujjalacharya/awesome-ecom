import { GLOBAL_ERROR, GET_ORDERS } from "../types";
import api from "../../utils/api";


export const getOrders = (id,page,perPage,status='', keyword='') => async (dispatch) => {
  try {
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

