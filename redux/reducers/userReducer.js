import {
  SET_USER,
  SET_USER_SIGNOUT,
  SET_USER_CART,
  DELETE_USER_CART,
  CLEAR_USER_CARTS,
  ADD_STOREITEM_CART,
  DELETE_STOREITEM_CART,
  ADD_ONLINEITEM_CART,
  DELETE_ONLINEITEM_CART,
} from '../types';
import { saveStoreCartsState, saveOnlineCartsState } from '../localStore';

let INITIAL_STATE = {
  id: 'guess',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  pictureUrl: '',
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
    case ADD_STOREITEM_CART:
      index = state.carts.findIndex(
        (cart) => cart.product.id === action.payload.product.id
      );
      if (index > -1) {
        carts = state.carts;
        carts[index].quantity += 1;
        saveStoreCartsState(carts);
        return { ...state, carts };
      }
      saveStoreCartsState([...state.carts, action.payload]);
      return { ...state, carts: [...state.carts, action.payload] };
    case DELETE_STOREITEM_CART:
      carts = state.carts.filter((cart) => cart.product.id !== action.payload);
      saveStoreCartsState(carts);
      return { ...state, carts };
    case ADD_ONLINEITEM_CART:
      index = state.carts.findIndex(
        (cart) => cart.product.id === action.payload.product.id
      );
      if (index > -1) {
        carts = state.carts;
        carts[index].quantity += 1;
        saveOnlineCartsState(carts);
        return { ...state, carts };
      }
      saveOnlineCartsState([...state.carts, action.payload]);
      return { ...state, carts: [...state.carts, action.payload] };
    case DELETE_ONLINEITEM_CART:
      carts = state.carts.filter((cart) => cart.product.id !== action.payload);
      saveOnlineCartsState(carts);
      return { ...state, carts };
    default:
      return state;
  }
};

export default userReducer;
