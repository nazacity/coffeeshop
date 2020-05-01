import React from 'react';

// Next
import Link from '../../src/Link';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Components
import MotionSlider from './motionslider';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '3.5em',
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

const DtProducts = ({ beverageObject, foodObject, sweetObject }) => {
  const classes = useStyles();

  return (
    <>
      <div>
        <div style={{ marginBottom: '3em', marginTop: '3em' }}>
          <Typography variant="h2" className={classes.title}>
            BEVERAGE
          </Typography>
          <MotionSlider padding={30} gap={30}>
            {beverageObject.map((object, i) => (
              <Link href={`/product/${object.id}`} key={object.name}>
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
                </motion.div>
              </Link>
            ))}
          </MotionSlider>
        </div>
        <div style={{ marginBottom: '3em' }}>
          <Typography variant="h2" className={classes.title}>
            FOOD
          </Typography>
          <MotionSlider padding={30} gap={30}>
            {foodObject.map((object, i) => (
              <Link href={`/product/${object.id}`} key={object.name}>
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
                </motion.div>
              </Link>
            ))}
          </MotionSlider>
        </div>
        <div style={{ marginBottom: '3em' }}>
          <Typography variant="h2" className={classes.title}>
            SWEET
          </Typography>
          <MotionSlider padding={30} gap={30}>
            {sweetObject.map((object, i) => (
              <Link href={`/product/${object.id}`} key={object.name}>
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
                </motion.div>
              </Link>
            ))}
          </MotionSlider>
        </div>
      </div>
    </>
  );
};

export default DtProducts;
