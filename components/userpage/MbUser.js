import React from 'react';

// Framer-motion
import { motion } from 'framer-motion';

// Components
import MbRegister from './register/MbRegister';

const MbUser = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.2,
        ease: 'easeInOut'
      }}
      style={{ padding: '20px' }}
    >
      <MbRegister />
    </motion.div>
  );
};

export default MbUser;
