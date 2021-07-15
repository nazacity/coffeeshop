import { SET_STOREPRODUCTCATALOGS, SET_ONLINEPRODUCTCATALOGS } from '../types';

export const setStoreProductCatalogs = (products) => (dispatch) => {
  dispatch({
    type: SET_STOREPRODUCTCATALOGS,
    payload: products,
  });
};

export const setOnlineProductCatalogs = (products) => (dispatch) => {
  dispatch({
    type: SET_ONLINEPRODUCTCATALOGS,
    payload: products,
  });
};
