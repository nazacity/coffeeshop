import React, { useState } from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_ORDER } from '../../apollo/mutation';

// Next
import Head from 'next/head';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearUserCarts } from '../../redux/actions/userActions';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';

// Components
import { SwipeableList } from '@sandstreamdev/react-swipeable-list';
import CartItemList from './CartItemList';
import CheckoutWithCreditCard from './components/CheckoutWithCreditCard';
import CheckoutWithInternetBanking from './components/CheckoutWithInternetBanking';

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

const DtCart = () => {
  const theme = useTheme();
  const action = useDispatch();
  const classes = useStyles();
  const carts = useSelector((state) => state.user.carts);
  const [progressing, setProgressing] = useState(false);

  const calculateAmount = (carts) => {
    const amount = carts.reduce(
      (sum, cart) => sum + cart.quantity * cart.product.price,
      0
    );
    return amount * 100;
  };

  const [createOrder, { loading, error }] = useMutation(MUTATION_CREATE_ORDER, {
    onCompleted: (data) => {
      console.log(data);
      if (data.createOrder.authorize_uri) {
        window.location.href = data.createOrder.authorize_uri;
      }
      action(clearUserCarts());
    },
  });

  const handleCheckout = async (amount, cardId, token, return_uri) => {
    const result = await createOrder({
      variables: { amount, cardId, token, return_uri },
    });
    console.log('result', result);
  };

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
        <div style={{ margin: '30px auto' }}>
          <Typography variant="h2" align="center">
            <ListItemIcon>
              <ShoppingCartIcon
                style={{ fontSize: '50px' }}
                color="secondary"
              />
            </ListItemIcon>
            CART ITEM
          </Typography>
          <Typography variant="h5" align="center">
            เลื่อนสินค้าไปทางซ้ายเพื่อลบ
          </Typography>
        </div>

        <div style={{ maxWidth: '1280px', margin: 'auto', width: '80%' }}>
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
              threshold={0.2}
            >
              {carts.map((cartItem, index) => (
                <CartItemList
                  key={cartItem.id}
                  cartItem={cartItem}
                  index={index}
                  userCartsLength={carts.length}
                />
              ))}
            </SwipeableList>
          )}
          {carts.length > 0 && (
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
                  {calculateAmount(carts) / 100}
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
                  {((calculateAmount(carts) / 100) * 0.07).toFixed(2)}
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
                  {((calculateAmount(carts) / 100) * 1.07).toFixed(2)}
                </h3>
                <h4 style={{ margin: 'auto' }}>บาท</h4>
              </div>
            </div>
          )}
        </div>
        {carts.length !== 0 && (
          <div>
            <CheckoutWithCreditCard
              amount={Math.floor(calculateAmount(carts) * 1.07)}
              handleCheckout={handleCheckout}
            />
            <CheckoutWithInternetBanking
              amount={Math.floor(calculateAmount(carts) * 1.07)}
              handleCheckout={handleCheckout}
            />
          </div>
        )}
      </motion.div>
    </>
  );
};

export default DtCart;
