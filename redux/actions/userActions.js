import {
  SET_USER,
  SET_USERLOADING,
  SET_USER_SIGNOUT,
  SET_NAVBARINDEX,
} from '../types';
import Cookies from 'js-cookie';
import Router from 'next/router';

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const userSignOut = () => (dispatch) => {
  Cookies.remove('accessToken');
  Router.push('/');
  dispatch({
    type: SET_NAVBARINDEX,
    payload: 0,
  });
  dispatch({
    type: SET_USERLOADING,
    payload: true,
  });
  dispatch({
    type: SET_USER_SIGNOUT,
  });
  setTimeout(() => {
    dispatch({
      type: SET_USERLOADING,
      payload: false,
    });
  }, 2000);
};
