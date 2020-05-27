import React from 'react';
import Script from 'react-load-script';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_ORDERITEM_FROM_ONLINEORDER } from '../../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearUserCarts } from '../../../redux/actions/userActions';
import { deleteOnlineCartsState } from '../../../redux/localStore';

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

const CheckoutWithInternetBanking = ({ amount, branchId, handleClose }) => {
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const classes = useStyles();
  const carts = useSelector((state) => state.user.carts);
  const action = useDispatch();

  const [createOrderItemFromOnlineOrder, { loading, error }] = useMutation(
    MUTATION_CREATE_ORDERITEM_FROM_ONLINEORDER,
    {
      onCompleted: (data) => {
        console.log(data.createOrderItemFromOnlineOrder);
        action(clearUserCarts());
        deleteOnlineCartsState();
        if (data.createOrderItemFromOnlineOrder.authorizeUri) {
          window.location.href =
            data.createOrderItemFromOnlineOrder.authorizeUri;
        }
      },
    }
  );

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: process.env.OMISE_PUBLIC_KEY,
      currency: 'thb',
      frameLabel: 'Coffee Shop',
      submitLabel: 'ชำระเงิน',
      buttonLabel: 'ชำระด้วย OMISE',
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

    OmiseCard.open({
      frameDescription: 'Invoice #3847',
      amount,
      onCreateTokenSuccess: async (token) => {
        let orderItem = [];
        await carts.map((item) => {
          orderItem.push({
            productId: item.product.id,
            quantity: item.quantity,
          });
        });

        try {
          createOrderItemFromOnlineOrder({
            variables: {
              amount: amount,
              token: token,
              return_uri: redirect_uri,
              orderItem: orderItem,
              branchId: branchId,
            },
          });
        } catch (error) {}
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = (e) => {
    handleClose();
    e.preventDefault();
    internetBankingConfigure();
    omiseCardHandler();
  };

  return (
    <React.Fragment>
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <form
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '1vh auto',
        }}
      >
        <Button
          variant="contained"
          id="internet-banking"
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
      </form>
    </React.Fragment>
  );
};

export default CheckoutWithInternetBanking;
