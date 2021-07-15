import React, { useRef, useEffect } from 'react';

// Next
import Link from '../../src/Link';
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
<<<<<<< HEAD
    boxShadow: '-1px -5px 5px 1px rgba(255,214,255,0.5)',
=======
    boxShadow: theme.common.shadow.main,
>>>>>>> 37c893abbc5e15ee31a9e383d21402e36944409a
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
      name: 'หน้าแรก',
      link: '/',
      selectedIndex: 0,
      icon: <HomeIcon />,
    },
    {
<<<<<<< HEAD
      name: 'Lesson',
      link: '/lesson',
      selectedIndex: 1,
      icon: <Icon className="fas fa-school" />,
=======
      name: 'สินค้า',
      link: '/product',
      selectedIndex: 1,
      icon: <LocalCafeIcon />,
    },
    {
      name: 'ตะกร้า',
      link: '/cart',
      selectedIndex: 2,
      icon: (
        <Badge
          badgeContent={cartQuantity(user.carts)}
          color="primary"
          classes={{ colorPrimary: classes.badge }}
        >
          <ShoppingCartIcon />
        </Badge>
      ),
>>>>>>> 37c893abbc5e15ee31a9e383d21402e36944409a
    },
  ];

  const handleChange = (event, activeIndex) => {
    action(setMenuIndex(activeIndex));
  };

  const route = useRouter();

  useEffect(() => {
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
  }, [menuIndex, window.location.pathname]);

  return (
    <React.Fragment>
      {user.state !== 'StoreClient' && (
        <div className={classes.root} style={{ zIndex: 2, width: '100vw' }}>
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
                    : 'ลงทะเบียน'
                  : 'ลงชื่อเข้าใช้'
              }
              value={3}
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
                        : user.state === 'client0' && userLoading === false
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
                  : user.state === 'client0' && userLoading === false
                  ? () => {
                      route.push('/user');
                    }
                  : userLoading === true
                  ? () => {}
                  : handleUserNavbarClick
              }
            />
<<<<<<< HEAD
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
=======
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
                <Typography variant="inherit">ข้อมูลผู้ใช้</Typography>
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
                โปรโมชั่น
              </Typography>
            </MenuItem>
            <Divider style={{ width: '60%', margin: '00px auto' }} />
            <MenuItem
              onClick={() => {
                action(userSignOut());
                handleClose();
              }}
            >
>>>>>>> 37c893abbc5e15ee31a9e383d21402e36944409a
              <ListItemIcon>
                <Icon
                  className="fas fa-sign-out-alt"
                  color="primary"
                  fontSize="small"
                />
              </ListItemIcon>
<<<<<<< HEAD
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
=======
              <Typography variant="inherit" color="primary">
                ลงชื่อออก
              </Typography>
            </MenuItem>
          </Menu>
        </div>
      )}
    </React.Fragment>
>>>>>>> 37c893abbc5e15ee31a9e383d21402e36944409a
  );
};

export default BottomNavbar;
