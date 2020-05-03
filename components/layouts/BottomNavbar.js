import React, { useEffect } from 'react';

// Framer-motion
import { motion } from 'framer-motion';

// Next
import Link from '../../src/Link';
import { useRouter } from 'next/router';

// Redux
import { setMenuIndex } from '../../redux/actions/layoutActions';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
  bottomnavroot: {
    padding: '6px 0px 8px',
    color: theme.common.color.white,
    boxShadow: '0px 0px 5px 3px rgba(169,120,67,0.5);',
  },
  bottomnavbox: {
    backgroundColor: theme.common.color.navColor,
  },
  userlogo: {
    width: '30px',
    height: '30px',
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

const BottomNavbar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const userLoading = useSelector((state) => state.layout.userLoading);
  const menuIndex = useSelector((state) => state.layout.menuIndex);
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

  const handleChange = (event, activeIndex) => {
    action(setMenuIndex(activeIndex));
  };

  const route = useRouter();

  const checkRoute = () => {
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
        default:
          break;
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: '0%' }}
      transition={{
        duration: 1.2,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className={classes.root}
      onAnimationStart={checkRoute}
      style={{ zIndex: 2, width: '100vw' }}
    >
      <BottomNavigation
        value={menuIndex}
        onChange={handleChange}
        className={classes.bottomnavbox}
      >
        {menuOptions.map((menu) => (
          <BottomNavigationAction
            component={Link}
            href={menu.link}
            key={menu.name}
            label={menu.name}
            value={menu.selectedIndex}
            icon={menu.icon}
            classes={{
              root: classes.bottomnavroot,
              selected: classes.selected,
            }}
          />
        ))}
      </BottomNavigation>
    </motion.div>
  );
};

export default BottomNavbar;
