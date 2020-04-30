import React from 'react';

// MUI
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

// Components
import DtSignIn from '../../components/signin/DtSignIn';
import MbSignIn from '../../components/signin/MbSignIn';

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

export default SignInPages;
