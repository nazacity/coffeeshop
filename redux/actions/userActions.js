import {
  SET_USER,
  SET_USERLOADING,
  SET_USER_SIGNOUT,
  SET_NAVBARINDEX,
  SET_USER_CART,
  DELETE_USER_CART,
  CLEAR_USER_CARTS,
  ADD_STOREITEM_CART,
  DELETE_STOREITEM_CART,
  ADD_ONLINEITEM_CART,
  DELETE_ONLINEITEM_CART,
} from '../types';
import Cookies from 'js-cookie';
import Router from 'next/router';
import axios from 'axios';
import queryString from 'query-string';

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const userSignOut = () => async (dispatch) => {
  const accessToken = Cookies.get('accessToken');

  const res = await axios.post(
    'https://api.line.me/oauth2/v2.1/revoke',
    queryString.stringify({
      access_token: accessToken,
      client_id: process.env.LINE_CLIENT_KEY,
      client_secret: process.env.LINE_SECRET_KEY,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  if (res.status == 200) {
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
  }
};

export const updateUserCart = (newCart) => (dispatch) => {
  dispatch({
    type: SET_USER_CART,
    payload: newCart,
  });
};

export const deleteUserCart = (cartItemId) => (dispatch) => {
  dispatch({
    type: DELETE_USER_CART,
    payload: cartItemId,
  });
};

export const clearUserCarts = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER_CARTS,
  });
};

export const addStoreItemCart = (item) => (dispatch) => {
  let AddItem = {
    product: item,
    quantity: 1,
  };
  dispatch({
    type: ADD_STOREITEM_CART,
    payload: AddItem,
  });
};

export const deleteStoreItemCart = (id) => (dispatch) => {
  dispatch({
    type: DELETE_STOREITEM_CART,
    payload: id,
  });
};

export const addOnlineItemCart = (item) => (dispatch) => {
  let AddItem = {
    product: item,
    quantity: 1,
  };
  dispatch({
    type: ADD_ONLINEITEM_CART,
    payload: AddItem,
  });
};

export const deleteOnlineItemCart = (id) => (dispatch) => {
  dispatch({
    type: DELETE_ONLINEITEM_CART,
    payload: id,
  });
};
