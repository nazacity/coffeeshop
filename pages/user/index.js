import React from 'react';

// MUI
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

// Component
import DtUser from '../../components/userpage/DtUser';
import MbUser from '../../components/userpage/MbUser';

const UserPage = () => {
  return (
    <Container maxWidth={false}>
      <Hidden smDown>
        <DtUser />
      </Hidden>
      <Hidden mdUp>
        <MbUser />
      </Hidden>
    </Container>
  );
};

export default UserPage;
