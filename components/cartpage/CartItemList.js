import React from 'react';

// Framer-motion
import { motion } from 'framer-motion';

// Redux
import { useDispatch } from 'react-redux';
import { deleteUserCart } from '../../redux/actions/userActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_DELETECART } from '../../apollo/mutation';

// Components
import {
  SwipeableListItem,
  ActionAnimations,
} from '@sandstreamdev/react-swipeable-list';

// Toast
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles((theme) => ({
  progresscontainer: {
    padding: '5px',
    display: 'flex',
    position: 'relative',
  },
  top: {
    color: '#ffffff',
    zIndex: 1,
  },
  bottom: {
    right: 5,
    color: '#a2a2a2',
    position: 'absolute',
  },
}));

const CartItemList = ({
  cartItem,
  index,
  userCartsLength,
  deleteCart,
  loading,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesLGDown = useMediaQuery('(max-width:1300px)');
  const matchesMDDown = useMediaQuery('(max-width:1200px)');
  const matchesSMDown = useMediaQuery('(max-width:600px)');

  const handleDelete = async (cartItemId) => {
    try {
      await deleteCart({
        variables: {
          id: cartItemId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SwipeableListItem
      swipeLeft={{
        content: (
          <div
            style={{
              backgroundColor: '#c21414',
              width: '100%',
              marginRight: '5%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {!loading ? (
              <ListItemIcon
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '5px',
                  paddingRight: matchesSMDown
                    ? '2%'
                    : matchesMDDown
                    ? '4%'
                    : matchesLGDown
                    ? '4.5%'
                    : '5%',
                }}
              >
                <DeleteIcon style={{ color: '#fff' }} />
              </ListItemIcon>
            ) : (
              <div className={classes.progresscontainer}>
                <CircularProgress
                  size={24}
                  classes={{ colorPrimary: classes.top }}
                />
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={24}
                  classes={{ colorPrimary: classes.bottom }}
                />
              </div>
            )}
          </div>
        ),
        action: () => handleDelete(cartItem.id),
        actionAnimation: ActionAnimations.REMOVE,
      }}
      cartItemId={cartItem.id}
      style={{
        position: 'relative',
        transition: 'max-height 0.5s ease',
        maxHeight: '1000px',
        transformOrigin: 'top',
        width: '100%',
      }}
    >
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr 1fr',
          width: '100%',
          color: theme.palette.secondary.main,
        }}
        initial={{ x: '-30%', opacity: 0 }}
        animate={{ x: '0%', opacity: 1 }}
        exit={{
          x: '30%',
          opacity: 0,
          transition: {
            duration: 1,
            ease: 'easeIn',
            delay: (userCartsLength - index) * 0.2,
          },
        }}
        transition={{
          duration: 1,
          ease: 'easeOut',
          delay: 0.2 * index,
        }}
      >
        <Avatar
          alt={cartItem.product.name}
          src={cartItem.product.pictureUrl}
          style={{ margin: 'auto' }}
        />
        <p style={{ marginRight: '1rem' }}>{cartItem.product.name}</p>
        <p style={{ margin: 'auto' }}>{cartItem.quantity}</p>
        <p style={{ margin: 'auto' }}>
          {cartItem.product.price * cartItem.quantity}
        </p>
      </motion.div>
    </SwipeableListItem>
  );
};

export default CartItemList;
