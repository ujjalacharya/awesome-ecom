import { combineReducers } from "redux";
import Auth from "./auth_reducer";
import Test from "./test_reducer";

const rootReducer = combineReducers({
  Auth,
  Test,
});

export default rootReducer;
