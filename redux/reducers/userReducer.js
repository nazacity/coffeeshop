import { SET_USER } from '../types';

let INITIAL_STATE = {
  id: 'guess',
  lineId: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  pictureUrl: '',
  address: [],
  products: [],
  carts: [],
  state: 'guess',
  createdAt: ''
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      if (action.payload === null) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
