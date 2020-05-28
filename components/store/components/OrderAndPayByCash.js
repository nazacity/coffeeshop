import React from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_ORDERITEM_FROM_STOREORDER } from '../../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearUserCarts, updateBill } from '../../../redux/actions/userActions';
import { deleteStoreCartsState } from '../../../redux/localStore';

// MUI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Toast
import { useToasts } from 'react-toast-notifications';

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

const OrderAndPayByCash = ({ amount }) => {
  const classes = useStyles();
  const action = useDispatch();
  const carts = useSelector((state) => state.user.carts);
  const table = useSelector((state) => state.user.table);
  const { addToast } = useToasts();

  const [createOrderItemFromStoreOrder, { loading, error }] = useMutation(
    MUTATION_CREATE_ORDERITEM_FROM_STOREORDER,
    {
      onCompleted: (data) => {
        console.log(data.createOrderItemFromStoreOrder);
        action(clearUserCarts());
        action(updateBill(data.createOrderItemFromStoreOrder));
        deleteStoreCartsState();
        const content = (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>ขอบคุณค่ะ</Typography>
          </div>
        );
        addToast(content, {
          appearance: 'info',
          autoDismiss: true,
        });
      },
    }
  );

  const handleCheckout = async () => {
    let orderItem = [];
    carts.map((item) => {
      orderItem.push({
        productId: item.product.id,
        quantity: item.quantity,
      });
    });
    const result = await createOrderItemFromStoreOrder({
      variables: {
        tableId: table.bill.id,
        orderItem,
        branchId: table.branch.id,
      },
    });
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
      <Button
        variant="outlined"
        id="credit-card"
        type="button"
        onClick={handleCheckout}
        disabled={!amount}
        style={{
          padding: '5px 10px',
          cursor: 'pointer',
          fontSize: '18px',
        }}
        color="primary"
        disabled={loading || !table}
      >
        สั่งอาหาร
        {loading && (
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
  );
};

export default OrderAndPayByCash;
