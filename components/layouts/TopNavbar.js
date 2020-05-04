import React from 'react';

// Next
import Link from '../../src/Link';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Framer-motion
import { motion } from 'framer-motion';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setDrawerTopNavbar } from '../../redux/actions/layoutActions';
import { userSignOut } from '../../redux/actions/userActions';

// Mui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

// components
import DrawerTopNavbar from './DrawerTopNavbar';
import { route } from 'next/dist/next-server/server/router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: theme.common.color.navColor,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: theme.common.color.white,
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

const TopNavbar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const userLoading = useSelector((state) => state.layout.userLoading);
  const action = useDispatch();
  const route = useRouter();

  const cartQuantity = (carts) => {
    const quantity = carts.reduce((sum, cart) => sum + cart.quantity, 0);
    return quantity;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
        />
      </Head>
      <motion.div
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: '0%' }}
        transition={{
          duration: 2,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      >
        <AppBar position="static" classes={{ root: classes.navbar }}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => action(setDrawerTopNavbar())}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" className={classes.title}>
              <Typography variant="h6">Coffee Shop</Typography>
            </Link>
            <div>
              <Link href="/product" style={{ marginRight: '2em' }}>
                <IconButton>
                  <LocalCafeIcon style={{ color: '#fff' }} />
                </IconButton>
              </Link>
              {user?.state !== 'guess' && (
                <Link href="/cart" style={{ marginRight: '2em' }}>
                  <IconButton>
                    <Badge
                      badgeContent={cartQuantity(user.carts)}
                      color="primary"
                      classes={{ colorPrimary: classes.badge }}
                    >
                      <ShoppingCartIcon style={{ color: '#fff' }} />
                    </Badge>
                  </IconButton>
                </Link>
              )}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={
                  user.state === 'guess' && userLoading === false
                    ? () => {
                        route.push('/signin');
                      }
                    : user.state === 'client0' && userLoading === false
                    ? () => {
                        route.push('/user');
                      }
                    : userLoading === true
                    ? () => {}
                    : handleMenu
                }
              >
                {userLoading ? (
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
                  <AccountCircleIcon style={{ fontSize: 40 }} />
                )}
              </IconButton>
            </div>
          </Toolbar>
          <DrawerTopNavbar />
        </AppBar>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          elevation={2}
          style={{ top: '10px' }}
          transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          style={{ top: '30px', left: '10px' }}
        >
          <MenuItem
            style={{ width: '40%', minWidth: '250px', maxWidth: '400px' }}
          >
            <Link href="/user" onClick={handleClose}>
              <ListItemIcon>
                <Icon
                  className="fas fa-user"
                  color="primary"
                  fontSize="small"
                />
              </ListItemIcon>
              <Typography variant="inherit">USER INFOMATION</Typography>
            </Link>
          </MenuItem>
          <Divider style={{ width: '60%', margin: '00px auto' }} />
          <MenuItem>
            <ListItemIcon>
              <Icon
                className="fas fa-smile-wink"
                color="primary"
                fontSize="small"
              />
            </ListItemIcon>
            <Typography variant="inherit" color="primary">
              PROMOTION
            </Typography>
          </MenuItem>
          <Divider style={{ width: '60%', margin: '00px auto' }} />
          <MenuItem
            onClick={() => {
              action(userSignOut());
              handleClose();
            }}
          >
            <ListItemIcon>
              <Icon
                className="fas fa-sign-out-alt"
                color="primary"
                fontSize="small"
              />
            </ListItemIcon>
            <Typography variant="inherit" color="primary">
              SIGN OUT
            </Typography>
          </MenuItem>
        </Menu>
      </motion.div>
    </>
  );
};

export default TopNavbar;
