import React, { useState, useEffect } from 'react';

// firebase
import { db } from '../../../firebase';

// Next
import Head from 'next/head';
import router from 'next/router';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';

// Components
import { SwipeableList } from '@sandstreamdev/react-swipeable-list';
import CartItemList from './CartItemList';
import OrderAndPayByCash from './OrderAndPayByCash';

// Toast
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles((theme) => ({
  userlogo: {
    margin: 'auto 10px',
    height: '150px',
    width: '150px',
    border: '5px solid',
    borderColor: theme.common.color.navColor,
  },
  root: {
    width: '100%',
    marginBottom: '100px',
    color: theme.palette.secondary.main,
  },
}));

const CartDisplay = () => {
  const classes = useStyles();
  const carts = useSelector((state) => state.user.carts);
  const action = useDispatch();
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const { addToast } = useToasts();
  const theme = useTheme();

  return (
    <React.Fragment>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{
          duration: 1.2,
          ease: 'easeInOut',
        }}
        className={classes.root}
      >
        <div
          style={{
            display: 'flex',
            margin: '1vh',
            alignItems: 'center',
            justifyContent: matches1024down ? undefined : 'center',
            color: theme.palette.secondary.main,
          }}
        >
          <Avatar
            src="./images/logo/logo.jpg"
            alt="coffee cafe"
            style={{
              width: matches1024down ? 60 : 90,
              height: matches1024down ? 60 : 90,
              boxShadow: theme.common.shadow.main,
              marginRight: '1vh',
            }}
          />
          <Typography variant={matches1024down ? 'h5' : 'h4'}>
            รายการอาหาร
          </Typography>
        </div>
        <Divider style={{ width: '80%', margin: 'auto' }} />
        <div
          style={{
            maxWidth: '1280px',
            margin: 'auto',
            width: matches1024down ? '100%' : '80%',
            color: theme.palette.secondary.main,
            marginTop: '20px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr',
              width: '100%',
              marginTop: 20,
            }}
          >
            <h3 style={{ margin: 'auto' }}></h3>
            <h3 style={{ margin: 'auto' }}>รายการ</h3>
            <h3 style={{ margin: 'auto' }}>จำนวน</h3>
            <h3 style={{ margin: 'auto' }}>ราคา</h3>
          </div>
          <Divider style={{ width: '100%', margin: '20px auto' }} />

          {carts.length === 0 ? (
            <div style={{ padding: '0 10px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr ',
                  width: '100%',
                }}
              >
                <h5 style={{ margin: 'auto' }}>ไม่มีร้านการสินค้า</h5>
              </div>
            </div>
          ) : (
            <SwipeableList
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
              }}
            >
              {carts.map((cartItem, index) => (
                <CartItemList
                  key={cartItem.product.id}
                  cartItem={cartItem}
                  index={index}
                  userCartsLength={carts.length}
                />
              ))}
            </SwipeableList>
          )}
        </div>
        {carts.length !== 0 && (
          <div>
            <OrderAndPayByCash />
          </div>
        )}
      </motion.div>
    </React.Fragment>
  );
};

export default CartDisplay;
