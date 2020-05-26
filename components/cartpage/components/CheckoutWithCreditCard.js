import React from 'react';
import Script from 'react-load-script';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_ORDERITEM_FROM_ONLINEORDER } from '../../../apollo/mutation';

// Redux
import { useSelector } from 'react-redux';

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

const CheckoutWithCreditCard = ({ amount, branchId }) => {
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const classes = useStyles();
  const carts = useSelector((state) => state.user.carts);

  const [createOrderItemFromOnlineOrder, { loading, error }] = useMutation(
    MUTATION_CREATE_ORDERITEM_FROM_ONLINEORDER,
    {
      onCompleted: (data) => {
        console.log(data.createOrderItemFromOnlineOrder);
      },
    }
  );

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
    let orderItem = [];
    carts.map((item) => {
      orderItem.push({
        productId: item.product.id,
        quantity: item.quantity,
      });
    });

    OmiseCard.open({
      amount: amount,
      onCreateTokenSuccess: (token) => {
        console.log(token);
        console.log(token);
        createOrderItemFromOnlineOrder({
          variables: {
            amount: amount,
            token: token,
            orderItem: orderItem,
            branchId: branchId,
          },
        });
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
      style={{ margin: '1vh auto', display: 'flex', justifyContent: 'center' }}
    >
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <Button
        variant="contained"
        id="credit-card"
        type="button"
        onClick={handleClick}
        disabled={!amount}
        style={{
          padding: '5px 10px',
          cursor: 'pointer',
          fontSize: '14px',
          width: matches1024down ? '100%' : '30vw',
        }}
        color="primary"
      >
        ชำระทางบัตรเครดิต
      </Button>
    </div>
  );
};

export default CheckoutWithCreditCard;
