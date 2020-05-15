import React from 'react';

// firebase
import { db } from '../../../firebase';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_ORDER_BYCASH } from '../../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearUserCarts } from '../../../redux/actions/userActions';

// MUI
import Button from '@material-ui/core/Button';

const OrderAndPayByCash = ({ amount }) => {
  const action = useDispatch();
  const [createOrderByCash, { loading, error }] = useMutation(
    MUTATION_CREATE_ORDER_BYCASH,
    {
      onCompleted: (data) => {
        action(clearUserCarts());
        db.ref('/order').push(data.createOrderByCash);
      },
    }
  );

  const handleCheckout = async () => {
    const result = await createOrderByCash({
      variables: { amount, branch: 'online', table: '', discount: 0 },
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
        >
          จ่ายด้วยเงินสด
        </Button>
      </form>
    </div>
  );
};

export default OrderAndPayByCash;
