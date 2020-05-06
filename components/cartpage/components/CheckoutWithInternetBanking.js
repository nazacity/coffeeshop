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

const CheckoutWithInternetBanking = ({ amount, handleCheckout }) => {
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

  const internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'internet_banking',
      otherPaymentMethods: [
        'bill_payment_tesco_lotus',
        'alipay',
        'pay_easy',
        'net_banking',
        'convenience_store',
      ],
    });
    OmiseCard.configureButton('#internet-banking');
    OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    OmiseCard.open({
      frameDescription: 'Invoice #3847',
      amount,
      onCreateTokenSuccess: (token) => {
        console.log(token);
        handleCheckout(amount, null, token, 'http://localhost:3000/cart');
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = () => {
    internetBankingConfigure();
    omiseCardHandler();
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
          id="internet-banking"
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
          Pay with Inernet Banking
        </Button>
      </form>
    </div>
  );
};

export default CheckoutWithInternetBanking;
