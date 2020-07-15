import authActions from './authActions';
import productActions from './productActions';
import searchActions from './searchActions';
import userActions from './userActions';
import otherActions from './otherActions';
import cartActions from './cartActions';
import wishlistActions from './wishlistActions';
import orderActions from './orderActions';

export default {
  ...authActions,
  ...productActions,
  ...searchActions,
  ...userActions,
  ...otherActions,
  ...cartActions,
  ...wishlistActions,
  ...orderActions
};
