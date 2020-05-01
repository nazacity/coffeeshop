import React, { useEffect } from 'react';

// Next
import Link from '../../src/Link';

// Redux
import { connect } from 'react-redux';
import {
  setDrawerTopNavbar,
  setMenuIndex,
} from '../../redux/actions/layoutActions';

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

const DrawerTopNavbar = ({
  drawerTopNavbarOpen,
  setDrawerTopNavbar,
  setMenuIndex,
  menuIndex,
  user,
  userLoading,
}) => {
  const classes = useStyles();

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

  useEffect(() => {
    menuOptions.forEach((menu) => {
      switch (window.location.pathname) {
        case `${menu.link}`:
          if (menuIndex !== menu.selectedIndex) {
            setMenuIndex(menu.selectedIndex);
          }
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
      onClose={setDrawerTopNavbar}
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
              setDrawerTopNavbar();
              setMenuIndex(index);
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

const mapStateToProps = (state) => ({
  drawerTopNavbarOpen: state.layout.drawerTopNavbarOpen,
  menuIndex: state.layout.menuIndex,
  userLoading: state.layout.userLoading,
  user: state.user,
});

const mapActionToProps = {
  setDrawerTopNavbar,
  setMenuIndex,
};

export default connect(mapStateToProps, mapActionToProps)(DrawerTopNavbar);
