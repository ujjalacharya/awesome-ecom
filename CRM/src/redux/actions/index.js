import auth_actions from "./auth_actions";
import profile_actions from "./profile_actions";
import test_actions from "./test_actions";
import notification_actions from './notification_actions'
import order_actions from "./order_actions";
import product_actions from './product_actions'

export default {
  ...auth_actions,
  ...profile_actions,
  ...notification_actions,
  ...test_actions,
  ...order_actions,
  ...product_actions
};
