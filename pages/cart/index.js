import React, { useEffect } from 'react';
import { getUserByAccessToken } from '../../apollo/db';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

// MUI
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

// Component
import CartDisplay from '../../components/cartpage/CartDisplay';

// loadState
import { loadOnlineCartsState } from '../../redux/localStore';

// Other
import cookie from 'cookie';

const CartPage = ({ user }) => {
  const action = useDispatch();

  useEffect(() => {
    let carts = loadOnlineCartsState();
    if (carts === undefined) {
      carts = [];
    }
    action(setUser(user ? { ...user, carts } : null));
  }, [user]);
  return (
    <Container maxWidth={false}>
      <CartDisplay />
    </Container>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const { headers } = req;

  const cookies = headers && cookie.parse(headers.cookie || '');
  const accessToken = cookies && cookies.accessToken;

  if (!accessToken) {
    res.writeHead(302, { Location: '/signin' });
    res.end();
    return { props: {} };
  } else {
    const user = await getUserByAccessToken(accessToken);
    return { props: { user } };
  }
};

export default CartPage;
