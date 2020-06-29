import authActions from './authActions';
import productActions from './productActions';
import searchActions from './searchActions';

export default {
  ...authActions,
  ...productActions,
  ...searchActions
};
