import React from 'react';

// MUI
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

// Components
import DtSignIn from '../../components/signin/DtSignIn';
import MbSignIn from '../../components/signin/MbSignIn';

// Framer
import { motion } from 'framer-motion';

const SignInPages = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hidden smDown>
        <DtSignIn />
      </Hidden>
      <Hidden mdUp>
        <MbSignIn />
      </Hidden>
    </motion.div>
  );
};

export default SignInPages;
