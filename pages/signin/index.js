import React from 'react';

// MUI
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

// Components
import DtSignIn from '../../components/signin/DtSignIn';
import MbSignIn from '../../components/signin/MbSignIn';

// Other
import cookie from 'cookie';

const SignInPages = () => {
  return (
    <Container maxWidth={false}>
      <Hidden smDown>
        <DtSignIn />
      </Hidden>
      <Hidden mdUp>
        <MbSignIn />
      </Hidden>
    </Container>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const { headers } = req;

  const cookies = headers && cookie.parse(headers.cookie || '');
  const accessToken = cookies && cookies.accessToken;

  if (accessToken) {
    res.writeHead(302, { Location: '/' });
    res.end();
    return { props: {} };
  }
};

export default SignInPages;
