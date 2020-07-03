import authActions from './authActions';
import productActions from './productActions';
import searchActions from './searchActions';
import userActions from './userActions';

export default {
  ...authActions,
  ...productActions,
  ...searchActions,
  ...userActions
};
