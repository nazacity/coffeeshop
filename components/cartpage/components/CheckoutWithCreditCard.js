import React from 'react';
import Script from 'react-load-script';

// MUI
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_ORDERITEM_FROM_ONLINEORDER } from '../../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearUserCarts } from '../../../redux/actions/userActions';
import { deleteOnlineCartsState } from '../../../redux/localStore';

// Toast
import { useToasts } from 'react-toast-notifications';

let OmiseCard;

const CheckoutWithCreditCard = ({
  amount,
  branchId,
  handleClose,
  setCheckoutLoading,
}) => {
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const theme = useTheme();
  const carts = useSelector((state) => state.user.carts);
  const user = useSelector((state) => state.user);
  const action = useDispatch();
  const { addToast } = useToasts();

  const [createOrderItemFromOnlineOrder, { loading, error }] = useMutation(
    MUTATION_CREATE_ORDERITEM_FROM_ONLINEORDER,
    {
      onCompleted: (data) => {
        console.log(data.createOrderItemFromOnlineOrder);
        setCheckoutLoading(false);
        action(clearUserCarts());
        deleteOnlineCartsState();
        const content = (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={user.pictureUrl}
              alt={user.fisrtName}
              style={{
                marginRight: '1vh',
                backgroundColor: '#fff',
                boxShadow: theme.common.shadow.black,
              }}
            />
            <Typography>คุณ {user.name} ขอบคุณค่ะ</Typography>
          </div>
        );
        addToast(content, {
          appearance: 'info',
          autoDismiss: true,
        });
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
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton('#creditcard');
    OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    setCheckoutLoading(true);
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
        console.log(token);

        await createOrderItemFromOnlineOrder({
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
          id="creditcard"
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
    </React.Fragment>
  );
};

export default CheckoutWithCreditCard;
