import { SET_STOREPRODUCTCATALOGS, SET_ONLINEPRODUCTCATALOGS } from '../types';

let INITIAL_STATE = {
  storeProductCatalogs: [],
  onlineProductCatalogs: [],
};
const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // StoreProduct
    case SET_STOREPRODUCTCATALOGS:
      if (action.payload === null) {
        return state;
      }
      return { ...state, storeProductCatalogs: action.payload };
    // OnlineProduct
    case SET_ONLINEPRODUCTCATALOGS:
      if (action.payload === null) {
        return state;
      }
      return { ...state, onlineProductCatalogs: action.payload };
    default:
      return state;
  }
};

export default productReducer;
