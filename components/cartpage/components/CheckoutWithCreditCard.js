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

  console.log(amount);

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
      frameLabel: 'Coffee Cafe',
      submitLabel: 'ชำระเงิน',
      buttonLabel: 'ชำระด้วย OMISE',
    });
  };

  const creditCardConfigure = async () => {
    console.log('test2');
    await OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethods: [],
    });
    await OmiseCard.configureButton('#credit-card');
    await OmiseCard.attach();
  };

  const omiseHandler = () => {
    OmiseCard.open({
      amount: amount,
      onCreateTokenSuccess: async (token) => {
        let orderItem = [];
        await carts.map((item) => {
          orderItem.push({
            productId: item.product.id,
            quantity: item.quantity,
          });
        });
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
      <form style={{ width: '100%' }}>
        <Button
          variant="contained"
          id="credit-card"
          onClick={handleClick}
          disabled={!amount}
          style={{
            padding: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            width: matches1024down ? '100%' : '30vw',
            margin: 'auto',
          }}
          color="primary"
        >
          ชำระทางบัตรเครดิต
        </Button>
      </form>
    </div>
  );
};

export default CheckoutWithCreditCard;
