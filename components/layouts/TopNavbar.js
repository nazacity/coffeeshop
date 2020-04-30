import React from 'react';

// Next
import Link from '../../src/Link';

// Framer-motion
import { motion } from 'framer-motion';

// Redux
import { connect } from 'react-redux';
import { setDrawerTopNavbar } from '../../redux/actions/layoutActions';

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

// components
import DrawerTopNavbar from './DrawerTopNavbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  top: {
    color: theme.palette.secondary.dark,
  },
  bottom: {
    color: theme.palette.secondary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
}));

const TopNavbar = ({ setDrawerTopNavbar, user, userLoading }) => {
  const classes = useStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: '-100%' }}
      animate={{ opacity: 1, y: '0%' }}
      transition={{
        duration: 2,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
    >
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={setDrawerTopNavbar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Coffee Shop
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              component={Link}
              href={userLoading ? '' : user?.lineId ? '/user' : '/signin'}
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
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  userLoading: state.layout.userLoading,
  user: state.user,
});

const mapActionToProps = {
  setDrawerTopNavbar,
};

export default connect(mapStateToProps, mapActionToProps)(TopNavbar);
