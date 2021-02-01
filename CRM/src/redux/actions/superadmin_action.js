import { SUCCESS, ADMINS_TYPES,ADMIN_TYPES, BEING_ADMIN, BEING_SUPERADMIN} from "../types";
import { finish, init, success, error } from "../commonActions";
import { SuperadminService } from "../api/superadmin_api";

const superadminService = new SuperadminService();

export const getAdmins = (page,perPage,status) => async (dispatch) => {
  dispatch(init(ADMINS_TYPES.GET_ADMINS));

  const response = await superadminService.getAdmins(page,perPage,status);

  dispatch(finish(ADMINS_TYPES.GET_ADMINS));

  if (response.isSuccess) {
    dispatch(success(ADMINS_TYPES.GET_ADMINS, response.data));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const getAdmin = (id) => async (dispatch) => {
  dispatch(init(ADMIN_TYPES.GET_ADMIN));

  const response = await superadminService.getAdmin(id);

  dispatch(finish(ADMIN_TYPES.GET_ADMIN));

  if (response.isSuccess) {
    dispatch(success(ADMIN_TYPES.GET_ADMIN, response.data));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const beAdmin = (id, history) => async (dispatch) => {

  const response = await superadminService.getAdmin(id);
  
  if (response.isSuccess) {
    dispatch(success(BEING_ADMIN, response.data));
    history.push('/')
    return true
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
    return false
  }
};

export const beSuperAdmin = () => async dispatch => {
  dispatch({type:BEING_SUPERADMIN})
}

