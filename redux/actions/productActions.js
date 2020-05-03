import { SET_PRODUCTS } from '../types';

export const setProducts = (products) => (dispatch) => {
  dispatch({
    type: SET_PRODUCTS,
    payload: products,
  });
};
