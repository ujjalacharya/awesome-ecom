import { UPDATE_PROFILE } from "../types";
import api from "../../utils/api";

export const updateProfile = (profile, id) => async (dispatch) => {
  try {
    profile = JSON.stringify(profile);
    const res = await api.put(`/admin/${id}`, profile);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    return true;
  } catch (err) {
    console.log("****profile_actions/updateProfile****", err);
    return false;
    //error handling here..
  }
};

export default {
  updateProfile,
};
