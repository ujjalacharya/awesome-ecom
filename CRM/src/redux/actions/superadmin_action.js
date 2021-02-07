import { SUCCESS, ADMINS_TYPES,ADMIN_TYPES, BEING_ADMIN, BEING_SUPERADMIN, PRODUCTS_TYPES, TOGGLE_PRODUCT_STATUS_TYPES} from "../types";
import { finish, init, success, error } from "../commonActions";
import { SuperadminService } from "../api/superadmin_api";

const superadminService = new SuperadminService();

export const getAdmins = (page,perPage,status, keyword) => async (dispatch) => {
  dispatch(init(ADMINS_TYPES.GET_ADMINS));

  const response = await superadminService.getAdmins(page,perPage,status, keyword);

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

export const getProducts = ({ id, page, perPage, keyword, createdAt, updatedAt, status, price, outofstock }) => async (dispatch) => {
  dispatch(init(PRODUCTS_TYPES.GET_PRODUCTS));

  const response = await superadminService.getProducts({ page, perPage, keyword, createdAt, updatedAt, status, price, outofstock });

  dispatch(finish(PRODUCTS_TYPES.GET_PRODUCTS));

  if (response.isSuccess) {
    dispatch(success(PRODUCTS_TYPES.GET_PRODUCTS, response.data));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const approveProduct = (product_slug) => async (dispatch) => {
  dispatch(init(TOGGLE_PRODUCT_STATUS_TYPES.TOGGLE_PRODUCT_STATUS));

  const response = await superadminService.approveProduct(product_slug);

  dispatch(finish(TOGGLE_PRODUCT_STATUS_TYPES.TOGGLE_PRODUCT_STATUS));

  if (response.isSuccess) {
    dispatch(success(TOGGLE_PRODUCT_STATUS_TYPES.TOGGLE_PRODUCT_STATUS, response.data));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};

export const disApproveProduct = (product_slug, comment) => async (dispatch) => {
  dispatch(init(TOGGLE_PRODUCT_STATUS_TYPES.TOGGLE_PRODUCT_STATUS));

  const response = await superadminService.disApproveProduct(product_slug, comment);

  dispatch(finish(TOGGLE_PRODUCT_STATUS_TYPES.TOGGLE_PRODUCT_STATUS));

  if (response.isSuccess) {
    dispatch(success(TOGGLE_PRODUCT_STATUS_TYPES.TOGGLE_PRODUCT_STATUS, response.data[1]));
  } else if (!response.isSuccess) {
    dispatch(error(response.errorMessage));
  }
};