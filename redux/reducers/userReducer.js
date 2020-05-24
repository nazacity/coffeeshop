import {
  SET_USER,
  SET_USER_SIGNOUT,
  SET_USER_CART,
  DELETE_USER_CART,
  CLEAR_USER_CARTS,
  ADD_ITEM_CART,
  DELETE_ITEM_CART,
} from '../types';
import { saveCartsState } from '../localStore';

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
  let index;
  let carts;
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
    case DELETE_USER_CART:
      carts = state.carts.filter((cartItem) => cartItem.id !== action.payload);
      return { ...state, carts };
    case CLEAR_USER_CARTS:
      return { ...state, carts: [] };
    case ADD_ITEM_CART:
      index = state.carts.findIndex(
        (cart) => cart.product.id === action.payload.product.id
      );
      if (index > -1) {
        carts = state.carts;
        carts[index].quantity += 1;
        saveCartsState(carts);
        return { ...state, carts };
      }
      saveCartsState([...state.carts, action.payload]);
      return { ...state, carts: [...state.carts, action.payload] };
    case DELETE_ITEM_CART:
      carts = state.carts.filter((cart) => cart.product.id !== action.payload);
      saveCartsState(carts);
      return { ...state, carts };
    default:
      return state;
  }
};

export default userReducer;
