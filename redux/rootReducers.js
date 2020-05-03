import { combineReducers } from 'redux';
import layoutReducer from './reducers/layoutReducer';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';

const rootReducer = combineReducers({
  layout: layoutReducer,
  user: userReducer,
  products: productReducer,
});

export default rootReducer;
