import React from 'react';

// Redux
import { connect } from 'react-redux';

// Framer-motion
import { motion } from 'framer-motion';

// Components
import DtRegister from './register/DtRegister';
import DtUserDetail from './detail/DtUserDetail';

const DtUser = ({ user }) => {
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
      {user?.state === 'client0' ? <DtRegister /> : <DtUserDetail />}
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(DtUser);
