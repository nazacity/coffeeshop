import React, { useEffect, useState } from 'react';

// Framer motion
import { motion } from 'framer-motion';

// Next
import Link from '../../src/Link';
import Head from 'next/head';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';

// Components
import MotionSlider from '../productpage/motionslider';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    color: 'white',
  },
}));

const MbProductItem = ({ product, products }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/styles/float.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
        />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div style={{ marginTop: '10px', marginBottom: '100px' }}>
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            className="productitempicture"
          >
            <img src={product.pictureUrl} alt="" width="80%" />
          </div>
          <div style={{ marginBottom: '5px' }}>
            <Typography variant="h4" align="center" color="secondary">
              {product.name}
            </Typography>
          </div>
          <div style={{ padding: '0 20px', maxWidth: '400px', margin: 'auto' }}>
            <Typography variant="body1" color="secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptates eaque nesciunt eligendi beatae, officiis dolore eos
              sint fugiat vitae reprehenderit dignissimos expedita voluptatem
              similique est necessitatibus incidunt enim, reiciendis cupiditate?
            </Typography>
          </div>
          <div style={{ padding: '20px' }}>
            <Typography variant="h5" align="center" color="secondary">
              {product.price}.-
            </Typography>
          </div>
        </div>

        <Fab
          aria-label="add"
          size="small"
          classes={{ root: classes.fab }}
          onClick={handleClick}
        >
          <AddIcon />
        </Fab>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          elevation={2}
          style={{ top: '35px' }}
        >
          <MenuItem
            style={{ width: '40%', minWidth: '250px', maxWidth: '400px' }}
          >
            <Link href="/product" onClick={handleClose}>
              <ListItemIcon>
                <LocalCafeIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <Typography variant="inherit">BACK TO MENU</Typography>
            </Link>
          </MenuItem>
          <Divider style={{ width: '60%', margin: '00px auto' }} />
          <MenuItem>
            <ListItemIcon>
              <Icon
                className="fas fa-list-ul"
                color="primary"
                fontSize="small"
              />
            </ListItemIcon>
            <Typography variant="inherit" color="primary">
              ORDER
            </Typography>
          </MenuItem>
          <Divider style={{ width: '60%', margin: '00px auto' }} />
          <MenuItem>
            <ListItemIcon>
              <ShoppingCartIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <Typography variant="inherit" color="primary">
              CART
            </Typography>
          </MenuItem>
        </Menu>
      </motion.div>
    </>
  );
};

export default MbProductItem;
