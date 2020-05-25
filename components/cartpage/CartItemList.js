import React from 'react';

// Framer-motion
import { motion } from 'framer-motion';

// Redux
import { useDispatch } from 'react-redux';
import { deleteItemCart } from '../../redux/actions/userActions';

// MUI
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Components
import {
  SwipeableListItem,
  ActionAnimations,
} from '@sandstreamdev/react-swipeable-list';

// Toast
import { useToasts } from 'react-toast-notifications';

const CartItemList = ({ cartItem, index, userCartsLength }) => {
  const theme = useTheme();
  const matchesLGDown = useMediaQuery('(max-width:1300px)');
  const matchesMDDown = useMediaQuery('(max-width:1200px)');
  const matchesSMDown = useMediaQuery('(max-width:600px)');
  const action = useDispatch();
  const { addToast } = useToasts();

  const handleDelete = async (product) => {
    action(deleteItemCart(product.id));
    const content = (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={product.pictureUrl}
          alt={product.name}
          style={{
            marginRight: '1vh',
            backgroundColor: '#fff',
            boxShadow: theme.common.shadow.black,
          }}
        />
        <Typography>ลบ {product.name} เรียบร้อย</Typography>
      </div>
    );
    addToast(content, {
      appearance: 'error',
      autoDismiss: true,
    });
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
          </div>
        ),
        action: () => handleDelete(cartItem.product),
        actionAnimation: ActionAnimations.REMOVE,
      }}
      cartItemId={cartItem.product.id}
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
