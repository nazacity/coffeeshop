import React, { useEffect } from 'react';
import { getUserByAccessToken } from '../../apollo/db';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

// MUI
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

// Component
import DtCart from '../../components/cartpage/DtCart';
import MbCart from '../../components/cartpage/MbCart';

// Other
import cookie from 'cookie';

const CartPage = ({ user }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setUser(user ? user : null));
  }, [user]);
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

export const getServerSideProps = async ({ req, res }) => {
  const { headers } = req;

  const cookies = headers && cookie.parse(headers.cookie || '');
  const accessToken = cookies && cookies.accessToken;

  if (!accessToken) {
    res.writeHead(302, { Location: '/sigin' });
    res.end();
    return { props: {} };
  } else {
    const user = await getUserByAccessToken(accessToken);
    return { props: { user } };
  }
};

export default CartPage;
