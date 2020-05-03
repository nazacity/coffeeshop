import React from 'react';

// Next
import Link from '../../src/Link';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Components
import MotionSlider from './motionslider';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '3.5em',
    color: theme.palette.secondary.main,
  },
}));

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -60,
    opacity: 0,
    transition: {
      duration: 1.2,
      ease: 'easeInOut',
    },
  },
};

const DtProducts = ({ catalog, addToCart }) => {
  const classes = useStyles();

  const handleAddToCart = async (id) => {
    await addToCart({
      variables: {
        id: id,
        quantity: 1,
      },
    });
  };

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
                <motion.div
                  style={{
                    border: '2px solid',
                    borderColor: '#2b715d',
                    borderRadius: '5px',
                    overflow: 'hidden',
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Link
                    href={`/product/[productId]`}
                    as={`/product/${object.id}`}
                    key={object.name}
                  >
                    <motion.div
                      style={{
                        height: '200px',
                        width: '200px',
                        backgroundImage: `url(${object.pictureUrl})`,
                        backgroundSize: 'cover',
                      }}
                      variants={fadeInUp}
                      transition={{
                        duration: 0.9,
                        ease: 'easeInOut',
                        delay: 0.4 * i,
                      }}
                    ></motion.div>
                  </Link>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.6,
                      },
                    }}
                    transition={{
                      duration: 1.2,
                      ease: 'easeIn',
                      delay: 0.2 * i + 0.8,
                    }}
                  >
                    <Typography align="center" variant="body1" color="primary">
                      {object.name}
                    </Typography>
                    <Typography align="center" variant="body1" color="primary">
                      {object.price} บาท
                    </Typography>
                  </motion.div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '20px',
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleAddToCart(object.id)}
                    >
                      เพิ่มลงตะกร้า
                    </Button>
                  </div>
                </motion.div>
              ))}
            </MotionSlider>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default DtProducts;
