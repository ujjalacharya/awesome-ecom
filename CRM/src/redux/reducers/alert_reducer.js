import { GLOBAL_ERROR, SUCCESS } from "../types";

const initialState = {
  msg: null,
  hasError: false,
  hasSucess: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_ERROR:
      return { ...state, msg: action.payload, hasError: true, hasSuccess: false };
    case SUCCESS:
      return { ...state, msg: action.payload, hasSuccess: true , hasError: false};
    default:
      return state;
  }
};
