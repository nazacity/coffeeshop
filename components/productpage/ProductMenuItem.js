import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUserCart } from '../../redux/actions/userActions';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_ADDTOCART } from '../../apollo/mutation';

// Framer-motion
import { motion } from 'framer-motion';

// Next
import Link from '../../src/Link';
import route from 'next/router';

// MUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  top: {
    color: theme.palette.secondary.dark,
  },
  bottom: {
    color: theme.palette.secondary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
}));

const ProductMenuItem = ({ object, i }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const action = useDispatch();
  const [addToCart, { loading, error }] = useMutation(MUTATION_ADDTOCART, {
    onCompleted: (data) => {
      action(updateUserCart(data.addToCart));
    },
  });

  const handleAddToCart = async (id) => {
    await addToCart({
      variables: {
        id: id,
        quantity: 1,
      },
    });
  };

  return (
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
      <Link href={`/product/[productId]`} as={`/product/${object.id}`}>
        <motion.div
          style={{
            height: '200px',
            width: '200px',
            backgroundImage: `url(${object.pictureUrl})`,
            backgroundSize: 'cover',
          }}
          initial={{
            y: 60,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -60,
            opacity: 0,
            transition: {
              duration: 1.2,
              ease: 'easeInOut',
            },
          }}
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
          onClick={() => {
            if (user.state === 'guess') {
              route.push('/signin');
            } else {
              handleAddToCart(object.id);
            }
          }}
          disabled={loading}
        >
          เพิ่มลงตะกร้า
          {loading && (
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CircularProgress
                variant="determinate"
                value={100}
                className={classes.top}
                size={24}
                thickness={4}
              />
              <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.bottom}
                size={24}
                thickness={4}
              />
            </div>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductMenuItem;
