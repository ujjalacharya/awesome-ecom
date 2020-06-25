import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  authentication: authReducer,
  products: productReducer
});

export default rootReducer;
