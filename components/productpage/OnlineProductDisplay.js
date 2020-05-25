import React from 'react';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Components
import MotionSlider from './motionslider';
import ProductMenuItem from './ProductMenuItem';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.5em',
    color: theme.palette.secondary.main,
  },
}));

const OnlineProductDisplay = () => {
  const classes = useStyles();
  const catalogs = useSelector((state) => state.products.onlineProductCatalogs);

  return (
    <>
      <div style={{ marginBottom: '100px' }}>
        {catalogs.map((catalog) => (
          <motion.div
            style={{ marginBottom: '2vh', marginTop: '2vh' }}
            key={catalog.name}
          >
            <Typography variant="h2" align="center" className={classes.title}>
              {catalog.th}
            </Typography>
            <MotionSlider padding={30} gap={30}>
              {catalog.onlineProducts.map((object, i) => (
                <ProductMenuItem object={object} i={i} key={object.id} />
              ))}
            </MotionSlider>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default OnlineProductDisplay;
