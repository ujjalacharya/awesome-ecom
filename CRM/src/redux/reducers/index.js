import { combineReducers } from "redux";
import Auth from "./auth_reducer";
import Test from "./test_reducer";
import Profile from './profile_reducer'
import GlobalError from './globalerror_reducer'

const rootReducer = combineReducers({
  Auth,
  Test,
  Profile,
  GlobalError,
});

export default rootReducer;
