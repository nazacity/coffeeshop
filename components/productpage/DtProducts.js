import React from 'react';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Components
import MotionSlider from './motionslider';
import ProductMenuItem from './ProductMenuItem';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '3.5em',
    color: theme.palette.secondary.main,
  },
}));

const DtProducts = ({ catalog, addToCart }) => {
  const classes = useStyles();

  return (
    <>
      <div>
        {catalog.map((catalog) => (
          <motion.div
            style={{ marginBottom: '3em', marginTop: '3em' }}
            key={catalog.name}
          >
            <Typography variant="h2" className={classes.title}>
              {catalog.name.toUpperCase()}
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
