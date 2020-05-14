import React from 'react';
import Script from 'react-load-script';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  top: {
    color: theme.palette.primary.dark,
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
}));

let OmiseCard;

const CheckoutWithCreditCard = ({ handleCheckout, amount }) => {
  const classes = useStyles();
  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: process.env.OMISE_PUBLIC_KEY,
      currency: 'thb',
      frameLabel: 'Tea Shop',
      submitLabel: 'PAY NOW',
      buttonLabel: 'PAY with Omise',
    });
  };

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton('#credit-card');
    OmiseCard.attach();
  };

  const omiseHandler = () => {
    OmiseCard.open({
      amount: amount,
      onCreateTokenSuccess: (token) => {
        console.log(token);
        handleCheckout(amount, null, token);
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    creditCardConfigure();
    omiseHandler();
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <form>
        <Button
          variant="outlined"
          id="credit-card"
          type="button"
          onClick={handleClick}
          disabled={!amount}
          style={{
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '18px',
          }}
          color="primary"
        >
          จ่ายทางบัตรเครดิต
        </Button>
      </form>
    </div>
  );
};

export default CheckoutWithCreditCard;
