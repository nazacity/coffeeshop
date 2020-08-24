import React, { useEffect, useRef } from 'react';

// Framer-motion
import { motion } from 'framer-motion';

// Next
import Link from '../../src/Link';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Redux
import { setMenuIndex } from '../../redux/actions/layoutActions';
import { useSelector, useDispatch } from 'react-redux';
import { userSignOut } from '../../redux/actions/userActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    boxShadow: '-1px -5px 5px 1px rgba(255,214,255,0.5)',
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
  const userLoading = useSelector((state) => state.layout.userLoading);
  const menuIndex = useSelector((state) => state.layout.menuIndex);
  const action = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const userIcon = useRef();

  const handleUserNavbarClick = () => {
    userIcon.current.click();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuOptions = [
    {
      name: 'Home',
      link: '/',
      selectedIndex: 0,
      icon: <HomeIcon />,
    },
    {
      name: 'Lesson',
      link: '/lesson',
      selectedIndex: 1,
      icon: <Icon className="fas fa-school" />,
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
        case `/signin`:
          action(setMenuIndex(2));
          break;
        default:
          break;
      }
    });
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

          <BottomNavigationAction
            label={
              userLoading
                ? 'loading'
                : user?.state !== 'guess'
                ? user?.firstName !== ''
                  ? user.firstName.toUpperCase()
                  : 'REGISTER'
                : 'Sign In'
            }
            value={2}
            icon={
              userLoading ? (
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
                  ref={userIcon}
                  onClick={
                    user.state === 'guess' && userLoading === false
                      ? () => {
                          route.push('/signin');
                        }
                      : user.state === 'student0' && userLoading === false
                      ? () => {
                          route.push('/user');
                        }
                      : handleMenu
                  }
                />
              ) : (
                <AccountCircleIcon />
              )
            }
            classes={{
              root: classes.bottomnavroot,
              selected: classes.selected,
            }}
            onClick={
              user.state === 'guess' && userLoading === false
                ? () => {
                    route.push('/signin');
                  }
                : user.state === 'student0' && userLoading === false
                ? () => {
                    route.push('/user');
                  }
                : userLoading === true
                ? () => {}
                : handleUserNavbarClick
            }
          />
        </BottomNavigation>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          elevation={2}
          style={{ top: '10px' }}
          transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
              <Typography variant="inherit">ข้อมูลผู้ใช้งาน</Typography>
            </Link>
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
              ออกจากระบบ
            </Typography>
          </MenuItem>
        </Menu>
      </motion.div>
    </>
  );
};

export default BottomNavbar;
