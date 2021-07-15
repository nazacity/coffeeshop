import React, { useEffect } from 'react';
import { getUserByAccessToken } from '../../apollo/db';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

// MUI
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

// Component
import DtUser from '../../components/userpage/DtUser';
import MbUser from '../../components/userpage/MbUser';

// Other
import cookie from 'cookie';

// loadState
import { loadOnlineCartsState } from '../../redux/localStore';

const UserPage = ({ user }) => {
  const action = useDispatch();
  useEffect(() => {
    let carts = loadOnlineCartsState();
    if (carts === undefined) {
      carts = [];
    }
    action(setUser(user ? { ...user, carts } : null));
  }, [user]);

  return (
    <Container maxWidth={false} style={{ padding: '0' }}>
      <Hidden smDown>
        <DtUser />
      </Hidden>
      <Hidden mdUp>
        <MbUser />
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

export default UserPage;
