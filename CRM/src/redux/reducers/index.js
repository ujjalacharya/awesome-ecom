import { combineReducers } from "redux";
import User from "./user_reducer";
import Test from "./test_reducer";

const rootReducer = combineReducers({
  User,
  Test,
});

export default rootReducer;
