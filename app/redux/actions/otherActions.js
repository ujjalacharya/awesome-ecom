import { OtherService } from "../services/otherService";
import { GET_BANNER_IMAGES, GLOBAL_ERROR } from "../types";

export const getBannerImages = () => {
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

export default {
  getBannerImages,
};
