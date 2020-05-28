import React from 'react';

// MUI
import { Typography, Avatar, Divider } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Redux
import { useSelector } from 'react-redux';

// Framer
import { motion } from 'framer-motion';

const BillDisplay = () => {
  const theme = useTheme();
  const bill = useSelector((state) => state.user.table.bill);
  const matches1024down = useMediaQuery('(max-width:1024px)');

  const calculateAmount = (orderItems) => {
    const amount = orderItems.reduce(
      (sum, orderItem) =>
        sum + orderItem.quantity * orderItem.storeProduct.price,
      0
    );
    return amount * 100;
  };

  return (
    <React.Fragment>
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
          }}
        >
          <h3 style={{ margin: 'auto' }}></h3>
          <h3 style={{ margin: 'auto' }}>รายการ</h3>
          <h3 style={{ margin: 'auto' }}>จำนวน</h3>
          <h3 style={{ margin: 'auto' }}>ราคา</h3>
        </div>
        <Divider style={{ width: '100%', margin: '20px auto' }} />
        {bill?.items.map((item, index) => (
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr',
              width: '100%',
              color: theme.palette.secondary.main,
            }}
            initial={{ x: '-30%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{
              x: '30%',
              opacity: 0,
              transition: {
                duration: 1,
                ease: 'easeIn',
                delay: (bill.items.length - index) * 0.2,
              },
            }}
            transition={{
              duration: 1,
              ease: 'easeOut',
              delay: 0.2 * index,
            }}
            key={`${item.storeProduct.id}${index}`}
          >
            <Avatar
              src={item.storeProduct.pictureUrl}
              alt={item.storeProduct.name}
              style={{ margin: 'auto' }}
            />

            <p style={{ margin: 'auto' }}>{item.storeProduct.name}</p>
            <p style={{ margin: 'auto' }}>{item.quantity}</p>
            <p style={{ margin: 'auto' }}>
              {item.storeProduct.price * item.quantity}
            </p>
          </motion.div>
        ))}
      </div>
      {bill?.items.length > 0 && (
        <div style={{ color: theme.palette.secondary.main }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr',
              width: '100%',
            }}
          >
            <h4 style={{ margin: 'auto' }}></h4>
            <h4 style={{ marginRight: 'auto' }}>รวม</h4>
            <h4 style={{ marginLeft: 'auto' }}>
              {calculateAmount(bill?.items) / 100}
            </h4>
            <h4 style={{ margin: 'auto' }}>บาท</h4>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BillDisplay;
