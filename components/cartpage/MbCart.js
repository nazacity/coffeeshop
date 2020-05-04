import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Next
import Head from 'next/head';

// Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUserCart } from '../../redux/actions/userActions';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_DELETECART } from '../../apollo/mutation';

// Components
// import SwipeableListItem from './SwipeableList/SwipeableListItem';
// import SwipeableList from './SwipeableList/SwipeableList';
import {
  SwipeableList,
  SwipeableListItem,
  ActionAnimations,
} from '@sandstreamdev/react-swipeable-list';

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

const MbCart = () => {
  const theme = useTheme();
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [progressing, setProgressing] = useState(false);

  const calculateAmount = (carts) => {
    const amount = carts.reduce(
      (sum, cart) => sum + cart.quantity * cart.product.price,
      0
    );
    return amount * 100;
  };

  const action = useDispatch();
  const [deleteCart, { loading, error }] = useMutation(MUTATION_DELETECART, {
    onCompleted: (data) => {
      console.log(data.deleteCart.id);
      action(deleteUserCart(data.deleteCart.id));
      //route.reload();
    },
  });

  const handleDelete = async (cartItemId) => {
    console.log(cartItemId);
    try {
      await deleteCart({
        variables: {
          id: cartItemId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const threshold = 0.25;
  const transitionTimeout = 2500;

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="/styles/SwipeableList.css"
        />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1.2,
          ease: 'easeInOut',
        }}
        className={classes.root}
      >
        <List component="nav" aria-label="address">
          <ListItem>
            <ListItemIcon>
              <ShoppingCartIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="CART ITEM เลื่อนสินค้าไปทางขวาเพื่อลบ" />
          </ListItem>
        </List>
        <div style={{ padding: '0 10px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr',
              width: '100%',
            }}
          >
            <h3 style={{ margin: 'auto' }}></h3>
            <h3 style={{ margin: 'auto' }}>รายการ</h3>
            <h3 style={{ margin: 'auto' }}>จำนวน</h3>
            <h3 style={{ margin: 'auto' }}>ราคา</h3>
          </div>
          <Divider style={{ width: '60%', margin: '20px auto' }} />

          {user.carts.length === 0 ? (
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
              {user.carts.map((cartItem, i) => (
                <SwipeableListItem
                  swipeLeft={{
                    content: (
                      <div
                        style={{
                          backgroundColor: '#c21414',
                          width: '80%',
                          marginRight: '5%',
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <ListItemIcon>
                          <DeleteIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                      </div>
                    ),
                    action: () => handleDelete(cartItem.id),
                    actionAnimation: ActionAnimations.REMOVE,
                  }}
                  key={cartItem.id}
                  cartItemId={cartItem.id}
                  style={{
                    position: 'relative',
                    transition: 'max-height 0.5s ease',
                    maxHeight: '1000px',
                    transformOrigin: 'top',
                    width: '100%',
                  }}
                  threshold={threshold}
                >
                  <motion.div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 2fr 1fr 1fr',
                      width: '100%',
                      color: theme.palette.secondary.main,
                    }}
                    key={cartItem.product.id}
                    initial={{ x: '-30%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1 }}
                    exit={{
                      x: '30%',
                      opacity: 0,
                      transition: {
                        duration: 1,
                        ease: 'easeIn',
                        delay: (user.carts.length - i) * 0.2,
                      },
                    }}
                    transition={{
                      duration: 1,
                      ease: 'easeOut',
                      delay: 0.2 * i,
                    }}
                  >
                    <Avatar
                      alt={cartItem.product.name}
                      src={cartItem.product.pictureUrl}
                      style={{ margin: 'auto' }}
                    />
                    <p style={{ marginRight: '1rem' }}>
                      {cartItem.product.name}
                    </p>
                    <p style={{ margin: 'auto' }}>{cartItem.quantity}</p>
                    <p style={{ margin: 'auto' }}>
                      {cartItem.product.price * cartItem.quantity}
                    </p>
                  </motion.div>
                </SwipeableListItem>
              ))}
            </SwipeableList>
          )}
          {user.carts.length > 0 && (
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr 1fr',
                  width: '100%',
                }}
              >
                <h3 style={{ margin: 'auto' }}></h3>
                <h3 style={{ marginRight: 'auto' }}>รวม</h3>
                <h3 style={{ marginLeft: 'auto' }}>
                  {calculateAmount(user.carts) / 100}
                </h3>
                <h4 style={{ margin: 'auto' }}>บาท</h4>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr 1fr',
                  width: '100%',
                }}
              >
                <h4 style={{ margin: 'auto' }}></h4>
                <h4 style={{ marginRight: 'auto' }}>VAT 7%</h4>
                <h4 style={{ marginLeft: 'auto' }}>
                  {((calculateAmount(user.carts) / 100) * 0.07).toFixed(2)}
                </h4>
                <h4 style={{ margin: 'auto' }}>บาท</h4>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr 1fr',
                  width: '100%',
                }}
              >
                <h3 style={{ margin: 'auto' }}></h3>
                <h3 style={{ marginRight: 'auto' }}>สุทธิ</h3>
                <h3 style={{ marginLeft: 'auto' }}>
                  {((calculateAmount(user.carts) / 100) * 1.07).toFixed(2)}
                </h3>
                <h4 style={{ margin: 'auto' }}>บาท</h4>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default MbCart;
