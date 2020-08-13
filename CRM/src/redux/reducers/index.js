import { combineReducers } from "redux";
import auth from "./auth_reducer";
import test from "./test_reducer";
import profile from './profile_reducer'
import alert from './alert_reducer'

const rootReducer = combineReducers({
  auth,
  test,
  profile,
  alert,
});

export default rootReducer;
