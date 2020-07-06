import fetch from "isomorphic-unfetch";
import { USER_PROFILE, GLOBAL_ERROR, EDIT_ADDRESS, ADD_ADDRESS } from "../types";
import { UserService } from "../services/userService";

const getUserProfile = (id) => {
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
      console.log(response)
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
      console.log(response)
      dispatch({ type: EDIT_ADDRESS, payload: response.data });
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
    addAddress
};
