import React, { useState } from 'react';

// Next
import Link from 'next/link';

// Redux
import { useSelector } from 'react-redux';

// MUI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import PaymentDialog from './PaymentDialog';

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    '&$disabled': {
      color: theme.palette.primary.light,
      backgroundColor: '#f2f2f2',
      border: '1px solid #b1b1b1',
    },
  },
  disabled: {},
  top: {
    color: theme.palette.primary.dark,
    position: 'absolute',
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
  },
}));

const OrderButton = ({ amount }) => {
  const carts = useSelector((state) => state.user.carts);
  const state = useSelector((state) => state.user.state);
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const matches1024down = useMediaQuery('(max-width:1024px)');

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {state === 'client0' ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Link href="/user">
            <Button
              variant="outlined"
              id="credit-card"
              type="button"
              style={{
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: '18px',
              }}
              color="primary"
            >
              ลงทะเบียน
            </Button>
          </Link>
        </div>
      ) : (
        carts.length > 0 && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <Button
              variant="contained"
              id="credit-card"
              type="button"
              onClick={handleClickOpen}
              style={{
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: '18px',
                width: matches1024down ? '95vw' : '30vw',
              }}
              color="primary"
              disabled={checkoutLoading}
              classes={{ root: classes.buttonRoot, disabled: classes.disabled }}
            >
              สั่งอาหาร
              {checkoutLoading && (
                <div
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    className={classes.top}
                    size={24}
                    thickness={4}
                  />
                  <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    className={classes.bottom}
                    size={24}
                    thickness={4}
                  />
                </div>
              )}
            </Button>
          </div>
        )
      )}

      <PaymentDialog
        open={open}
        setCheckoutLoading={setCheckoutLoading}
        handleClose={handleClose}
        amount={amount}
      />
    </React.Fragment>
  );
};

export default OrderButton;
