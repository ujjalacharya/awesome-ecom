import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import menuReducer from './menuReducer';
import listingReducer from './listingReducer';

const rootReducer = combineReducers({
  authentication: authReducer,
  products: productReducer,
  menu: menuReducer,
  listing: listingReducer,
});

export default rootReducer;
