import React from 'react';

// MUI
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

// Component
import DtCart from '../../components/cartpage/DtCart';
import MbCart from '../../components/cartpage/MbCart';

const CartPage = () => {
  return (
    <Container maxWidth={false}>
      <Hidden smDown>
        <DtCart />
      </Hidden>
      <Hidden mdUp>
        <MbCart />
      </Hidden>
    </Container>
  );
};

export default CartPage;
