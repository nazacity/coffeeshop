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

const CheckoutWithInternetBanking = ({ amount, branchId }) => {
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
    const redirect_uri = process.env.LINE_REDIRECT_URI;

    let orderItem = [];
    carts.map((item) => {
      orderItem.push({
        productId: item.product.id,
        quantity: item.quantity,
      });
    });

    OmiseCard.open({
      frameDescription: 'Invoice #3847',
      amount,
      onCreateTokenSuccess: (token) => {
        console.log(token);
        createOrderItemFromOnlineOrder({
          variables: {
            amount: amount,
            token: token,
            return_uri: redirect_uri,
            orderItem: orderItem,
            branchId: branchId,
          },
        });
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = () => {
    internetBankingConfigure();
    omiseCardHandler();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <Button
        variant="contained"
        id="internet-banking"
        type="button"
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
        ชำระทางอินเตอร์เน็ตแบงค์คิง
      </Button>
    </div>
  );
};

export default CheckoutWithInternetBanking;
