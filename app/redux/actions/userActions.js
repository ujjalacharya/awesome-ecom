import {
  USER_PROFILE,
  GLOBAL_ERROR,
  EDIT_ADDRESS,
  ADD_ADDRESS,
  TOGGLE_ACTIVE_ADDRESS,
  UPDATE_PROFILE_PICTURE,
  MY_PROFILE_REVIEWS,
} from "../types";
import { UserService } from "../services/userService";
import { decodeToken } from "../../utils/common";

export const getUserProfile = (id) => {
  return async (dispatch) => {
    const userService = new UserService();
    const response = await userService.getUserProfile(id);
    if (response.isSuccess) {
      dispatch({ type: USER_PROFILE, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const addAddress = (body) => {
  return async (dispatch) => {
    const userService = new UserService();
    const response = await userService.addAddress(body);
    if (response.isSuccess) {
      dispatch({ type: ADD_ADDRESS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const editAddress = (id, body) => {
  return async (dispatch) => {
    const userService = new UserService();
    const response = await userService.editAddress(id, body);
    if (response.isSuccess) {
      dispatch({ type: EDIT_ADDRESS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const toggleActiveAddress = (query) => {
  return async (dispatch) => {
    const userService = new UserService();
    const response = await userService.toggleActiveAddress(query);
    if (response.isSuccess) {
      dispatch({ type: TOGGLE_ACTIVE_ADDRESS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

export const updateProfilePicture = (body, token) => {
  return async (dispatch) => {
    const userService = new UserService();
    const response = await userService.updateProfilePicture(body, token);
    if (response.isSuccess) {
      dispatch({ type: UPDATE_PROFILE_PICTURE, payload: response.data });
      const _id = decodeToken(token);
      dispatch(getUserProfile(_id));
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

const getMyReviews = (query) => {
  return async (dispatch) => {
    const userService = new UserService();
    const response = await userService.getMyReviews(query);
    if (response.isSuccess) {
      dispatch({ type: MY_PROFILE_REVIEWS, payload: response.data });
    } else if (!response.isSuccess) {
      dispatch({
        type: GLOBAL_ERROR,
        payload: response.errorMessage,
      });
    }
  };
};

export default {
  getUserProfile,
  editAddress,
  addAddress,
  toggleActiveAddress,
  updateProfilePicture,
  getMyReviews,
};
