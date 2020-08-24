import React from 'react';

import { motion } from 'framer-motion';

// MUI
import Hidden from '@material-ui/core/Hidden';
import { useTheme } from '@material-ui/core/styles';

// Components
import MbLesson from '../../components/lesson/MbLesson';

const index = () => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hidden smDown>
        <div
          style={{
            maxWidth: theme.layer.maxWidth,
            margin: 'auto',
          }}
        >
          <MbLesson />
        </div>
      </Hidden>
      <Hidden mdUp>
        <MbLesson />
      </Hidden>
    </motion.div>
  );
};

export default index;
