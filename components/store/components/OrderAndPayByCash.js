import React from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_ORDERITEM_FROM_STOREORDER } from '../../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearUserCarts } from '../../../redux/actions/userActions';
import { deleteCartsState } from '../../../redux/localStore';

// MUI
import Button from '@material-ui/core/Button';

const OrderAndPayByCash = ({ amount }) => {
  const action = useDispatch();
  const carts = useSelector((state) => state.user.carts);
  const branchId = useSelector((state) => state.user.table.branch.id);
  const tableId = useSelector((state) => state.user.table.bill.id);

  const [createOrderItemFromStoreOrder, { loading, error }] = useMutation(
    MUTATION_CREATE_ORDERITEM_FROM_STOREORDER,
    {
      onCompleted: (data) => {
        action(clearUserCarts());
        deleteCartsState();
      },
    }
  );

  const handleCheckout = async () => {
    console.log('checkout');
    let orderItem = [];
    carts.map((item) => {
      orderItem.push({
        productId: item.product.id,
        quantity: item.quantity,
      });
    });
    const result = await createOrderItemFromStoreOrder({
      variables: { tableId, orderItem, branchId },
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
      <form>
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
          disabled={loading}
        >
          สั่งอาหาร
        </Button>
      </form>
    </div>
  );
};

export default OrderAndPayByCash;
