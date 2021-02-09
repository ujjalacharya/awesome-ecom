import { GLOBAL_ERROR, UPDATE_BANK, UPDATE_USER, GET_BANK_INFO, UPDATE_ADMIN_TYPES} from "../types";
import api from "../../utils/api";
import { finish, init, success, error } from "../commonActions";
import { ProfileService } from "../api/profile_api";

const profileService = new ProfileService();
export const updateProfile = (profile, id) => async (dispatch) => {
  dispatch(init(UPDATE_ADMIN_TYPES.UPDATE_ADMIN));

  const response = await profileService.updateProfile(profile,id);

  dispatch(finish(UPDATE_ADMIN_TYPES.UPDATE_ADMIN));

  if (response.isSuccess) {
    dispatch(success(UPDATE_ADMIN_TYPES.UPDATE_ADMIN, response.data));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
  try {
    profile = JSON.stringify(profile);
    const res = await api.put(`/admin/${id}`, profile);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    return true;
  } catch (err) {
    console.log("****profile_actions/updateProfile****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });

    return false;
    //error handling here..
  }
};

export const updateBank = (bank, id) => async (dispatch) => {
  try {
    const formData = new FormData();
    for (let key in bank) {
      formData.append(key, bank[key]);
    }
    const res = await api.put(`/admin/bank/${id}`, formData);
    dispatch({
      type: UPDATE_BANK,
      payload: res.data,
    });
    return true;
  } catch (err) {
    console.log("****profile_actions/updateBank****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });

    return false;
    //error handling here..
  }
};

export const getAdminBank = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/admin/bank/${id}`);
    dispatch({
      type: GET_BANK_INFO,
      payload: res.data,
    });
  } catch (err) {
    console.log("****profile_actions/getBank****", err);
    dispatch({ type: GLOBAL_ERROR, payload: err || "Not Found" });
  }
};