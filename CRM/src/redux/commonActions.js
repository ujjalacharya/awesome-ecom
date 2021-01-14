import { GLOBAL_ERROR } from "./types";

export const init = (type) => {
  return {
    type: `${type}_INIT`,
  };
};

export const finish = (type) => {
  return {
    type: `${type}_FINISH`,
  };
};

export const success = (type, payload) => {
  return {
    type: `${type}_SUCCESS`,
    payload,
  };
};

export const error = (payload) => {
  return {
    type: GLOBAL_ERROR,
    payload,
  };
};
