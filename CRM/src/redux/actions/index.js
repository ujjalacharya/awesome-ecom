import auth_actions from "./auth_actions";
import profile_actions from "./profile_actions";
import test_actions from "./test_actions";
import notification_actions from './notification_actions'

export default {
  ...auth_actions,
  ...profile_actions,
  ...notification_actions,
  ...test_actions,
};
