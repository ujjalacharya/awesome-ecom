import { TEST_TYPE } from "../types";

export default function (state = { test_store: null }, action) {
  switch (action.type) {
    case TEST_TYPE:
      return {
        ...state,
        test_store: action.payload,
      };

    default:
      return state;
  }
}
