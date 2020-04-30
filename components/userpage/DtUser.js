import React from 'react';

// Framer-motion
import { motion } from 'framer-motion';

const DtUser = () => {
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
      <h1>Desktop user page</h1>
    </motion.div>
  );
};

export default DtUser;
