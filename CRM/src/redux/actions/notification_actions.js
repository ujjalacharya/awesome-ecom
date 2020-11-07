import { GLOBAL_ERROR, GET_NOTIFICATIONS, READ_NOTIFICATION } from "../types";
import api from "../../utils/api";


export const getNotifications = () => async (dispatch) => {
  console.log('hello');
  try {
    const res = await api.get(`/admin/notifications`);
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {
    console.log("****notification_actions/getNotifications****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
  }
};

export const readNotification = (notification_id) => async (dispatch) => {
  try {
    const res = await api.patch(`/admin/read-notification/:${notification_id}`);
    dispatch({
      type: READ_NOTIFICATION,
      payload: res.data,
    });
  } catch (err) {
    console.log("****notification_actions/readNotification****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
  }
};
