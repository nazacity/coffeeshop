import { SET_PRODUCTS } from '../types';

let INITIAL_STATE = [];

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      if (action.payload === null) {
        return state;
      }
      return [...action.payload];
    default:
      return state;
  }
};

export default productReducer;
