import React from 'react';

// Next
import { useRouter } from 'next/router';

// Redux
import { setStoreMenuIndex } from '../../../redux/actions/layoutActions';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    boxShadow: theme.common.shadow.main,
  },
  bottomnavroot: {
    padding: '6px 0px 8px',
    color: theme.common.color.white,
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
  badge: {
    backgroundColor: 'red',
  },
}));

const BottomNavbar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const menuIndex = useSelector((state) => state.layout.storeMenuIndex);
  const action = useDispatch();

  const cartQuantity = (carts) => {
    const quantity = carts.reduce((sum, cart) => sum + cart.quantity, 0);
    return quantity;
  };

  const menuOptions = [
    {
      name: 'เมนู',
      selectedIndex: 0,
      icon: <LocalCafeIcon />,
    },
    {
      name: 'ตะกร้า',
      selectedIndex: 1,
      icon: (
        <Badge
          badgeContent={cartQuantity(user.carts)}
          color="primary"
          classes={{ colorPrimary: classes.badge }}
        >
          <ShoppingCartIcon />
        </Badge>
      ),
    },
    {
      name: 'รายการอาหาร',
      selectedIndex: 2,
      icon: <LibraryBooksIcon />,
    },
  ];

  const handleChange = (event, activeIndex) => {
    action(setStoreMenuIndex(activeIndex));
  };

  const route = useRouter();

  const checkRoute = () => {
    menuOptions.forEach((menu) => {
      switch (route.pathname) {
        case `${menu.link}`:
          if (menuIndex !== menu.selectedIndex) {
            action(setStoreMenuIndex(menu.selectedIndex));
          }
          break;
        default:
          break;
      }
    });
  };

  return (
    <React.Fragment>
      <div
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
      </div>
    </React.Fragment>
  );
};

export default BottomNavbar;
