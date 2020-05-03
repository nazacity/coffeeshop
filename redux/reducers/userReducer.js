import { SET_USER, SET_USER_SIGNOUT } from '../types';

let INITIAL_STATE = {
  id: 'guess',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  pictureUrl: '',
  address: [],
  products: [],
  carts: [],
  state: 'guess',
  createdAt: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      if (action.payload === null) {
        return state;
      }
      return { ...state, ...action.payload };
    case SET_USER_SIGNOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

export default userReducer;
