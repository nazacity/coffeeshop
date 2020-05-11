import React from 'react';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import MotionSlider from './motionslider';
import ProductMenuItem from './ProductMenuItem';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '2em',
    color: theme.palette.secondary.main,
  },
}));

const DtProducts = ({ catalog, addToCart }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches1025down = useMediaQuery('(max-width:1024px)');

  return (
    <>
      <div
        style={{
          maxWidth: matches1025down ? undefined : '1200px',
          margin: 'auto',
          boxShadow: matches1025down ? undefined : theme.common.shadow.black,
        }}
      >
        {catalog.map((catalog) => (
          <motion.div style={{ marginBottom: '2vh' }} key={catalog.name}>
            <Typography
              variant="h6"
              component="h2"
              align="center"
              className={classes.title}
            >
              {catalog.th}
            </Typography>
            <MotionSlider padding={30} gap={30}>
              {catalog.data.map((object, i) => (
                <ProductMenuItem object={object} i={i} key={object.id} />
              ))}
            </MotionSlider>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default DtProducts;
