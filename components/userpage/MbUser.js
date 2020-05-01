import React from 'react';

// Redux
import { connect } from 'react-redux';

// Framer-motion
import { motion } from 'framer-motion';

// Components
import MbRegister from './register/MbRegister';

const MbUser = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.2,
        ease: 'easeInOut',
      }}
    >
      {user?.state === 'client0' ? <MbRegister /> : <h1>MB USER PAGE</h1>}
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(MbUser);
