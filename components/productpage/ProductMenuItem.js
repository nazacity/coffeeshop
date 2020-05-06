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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  top: {
    color: theme.palette.primary.dark,
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  media: {
    height: '10vh',
  },
  cardRoot: {
    minWidth: '250px',
    width: '20vw',
    maxWidth: '300px',
    height: '400px',
    boxShadow: theme.common.shadow.black,
    borderRadius: '5px',
    overflow: 'hidden',
    paddingBottom: '2vh',
  },
}));

const ProductMenuItem = ({ object, i }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const theme = useTheme();

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
    <Card className={classes.cardRoot}>
      <CardActionArea>
        <Link href={`/product/[productId]`} as={`/product/${object.id}`}>
          <motion.div
            style={{
              minHeight: '250px',
              height: '20vw',
              maxHeight: '300px',
              width: '100%',
              backgroundImage: `url(${object.pictureUrl})`,
              backgroundSize: 'cover',
              margin: 'auto',
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
      </CardActionArea>
      <motion.div
        style={{
          position: 'relative',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <IconButton
          aria-label="add"
          style={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            position: 'absolute',
            right: 10,
            top: -25,
            border: '5px solid #fff',
            width: '60px',
            height: '60px',
          }}
          onClick={() => {
            if (user.state === 'guess') {
              route.push('/signin');
            } else {
              handleAddToCart(object.id);
            }
          }}
          disabled={loading}
        >
          {loading ? (
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
          ) : (
            <AddIcon />
          )}
        </IconButton>
      </motion.div>
      <CardContent>
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
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            align="center"
            color="primary"
          >
            {object.name}
          </Typography>
          <Typography align="center" variant="body1" color="primary">
            {object.name}
          </Typography>
          <Typography align="center" variant="body1" color="primary">
            {object.price} บาท
          </Typography>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ProductMenuItem;
