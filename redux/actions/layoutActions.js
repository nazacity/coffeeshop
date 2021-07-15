import {
  SET_NAVBARINDEX,
  SET_STORENAVBARINDEX,
  SET_DRAWERTOPNAVBAR,
  SET_USERLOADING,
} from '../types';

export const setMenuIndex = (activeIndex) => (dispatch) => {
  dispatch({
    type: SET_NAVBARINDEX,
    payload: activeIndex,
  });
};

export const setStoreMenuIndex = (activeIndex) => (dispatch) => {
  dispatch({
    type: SET_STORENAVBARINDEX,
    payload: activeIndex,
  });
};

export const setDrawerTopNavbar = () => (dispatch) => {
  dispatch({
    type: SET_DRAWERTOPNAVBAR,
  });
};

export const setUserLoading = (loading) => (dispatch) => {
  dispatch({
    type: SET_USERLOADING,
    payload: loading,
  });
};
