import { combineReducers } from 'redux';
import layoutReducer from './reducers/layoutReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  layout: layoutReducer,
  user: userReducer,
});

export default rootReducer;
