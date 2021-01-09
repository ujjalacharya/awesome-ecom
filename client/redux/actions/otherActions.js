import { message } from "antd";
import { OtherService } from "../services/otherService";
import { GET_BANNER_IMAGES, GLOBAL_ERROR, SUBSCRIBE_LEAD, SUBSCRIBE_LEAD_FINISH, SUBSCRIBE_LEAD_START } from "../types";

const getBannerImages = () => {
  return async (dispatch) => {
    const otherService = new OtherService();
    const response = await otherService.getBannerImages();
    if (response.isSuccess) {
      dispatch({ type: GET_BANNER_IMAGES, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const subscribeLead = (body) => {
  return async (dispatch) => {
    dispatch({ type: SUBSCRIBE_LEAD_START });
    const otherService = new OtherService();
    const response = await otherService.subscribeLead(body);
    if (response.isSuccess) {
      message.success('You have been subscribed successfully');
      dispatch({ type: SUBSCRIBE_LEAD, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({ type: SUBSCRIBE_LEAD_FINISH });
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
}

export default {
  getBannerImages,
  subscribeLead
};
