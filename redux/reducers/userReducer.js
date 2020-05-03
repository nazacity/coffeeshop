import { SET_USER, SET_USER_SIGNOUT, SET_USER_CART } from '../types';

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
    case SET_USER_CART:
      const findIndexOfCart = state.carts.findIndex(
        (cart) => cart.id == action.payload.id
      );
      if (findIndexOfCart > -1) {
        state.carts[findIndexOfCart] = action.payload;
        return { ...state };
      }
      return { ...state, carts: [...state.carts, action.payload] };
    default:
      return state;
  }
};

export default userReducer;
