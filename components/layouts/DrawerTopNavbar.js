import React, { useEffect } from 'react';

// Next
import Link from '../../src/Link';
import { useRouter } from 'next/router';

// Redux
import {
  setDrawerTopNavbar,
  setMenuIndex,
} from '../../redux/actions/layoutActions';
import { useSelector, useDispatch } from 'react-redux';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.common.color.navColor,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  top: {
    color: theme.palette.primary.dark,
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
}));

const DrawerTopNavbar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const userLoading = useSelector((state) => state.layout.userLoading);
  const menuIndex = useSelector((state) => state.layout.menuIndex);
  const drawerTopNavbarOpen = useSelector(
    (state) => state.layout.drawerTopNavbarOpen
  );
  const action = useDispatch();

  const menuOptions = [
    {
      name: 'Home',
      link: '/',
      selectedIndex: 0,
      icon: <HomeIcon />,
    },
    {
      name: 'Product',
      link: '/product',
      selectedIndex: 1,
      icon: <LocalCafeIcon />,
    },
    {
      name: 'Cart',
      link: '/cart',
      selectedIndex: 2,
      icon: <ShoppingCartIcon />,
    },
    {
      name: userLoading
        ? 'loading'
        : user?.state !== 'guess'
        ? user?.firstName !== ''
          ? user.firstName.toUpperCase()
          : 'User'
        : 'Sign In',
      link: userLoading ? '' : user?.state !== 'guess' ? '/user' : '/signin',
      selectedIndex: 3,
      icon: userLoading ? (
        <div style={{ position: 'relative' }}>
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
      ) : user.state !== 'guess' ? (
        <Avatar
          alt="line logo"
          src={user.pictureUrl}
          className={classes.userlogo}
        />
      ) : (
        <AccountCircleIcon />
      ),
    },
  ];

  const route = useRouter();

  useEffect(() => {
    menuOptions.forEach((menu) => {
      switch (route.pathname) {
        case `${menu.link}`:
          if (menuIndex !== menu.selectedIndex) {
            action(setMenuIndex(menu.selectedIndex));
          }
          break;
        case `/product/[productId]`:
          action(setMenuIndex(1));
          break;
        case `/signin`:
          action(setMenuIndex(3));
          break;
        default:
          break;
      }
    });
  }, [menuIndex, window.location.pathname]);

  return (
    <Drawer
      anchor="top"
      open={drawerTopNavbarOpen}
      onClose={() => action(setDrawerTopNavbar())}
    >
      <List>
        {menuOptions.map((menu, index) => (
          <ListItem
            button
            key={menu.name}
            component={Link}
            href={menu.link}
            selected={menuIndex === menu.selectedIndex}
            onClick={() => {
              action(setDrawerTopNavbar());
              action(setMenuIndex(index));
            }}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default DrawerTopNavbar;
