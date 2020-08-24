import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Next
import Head from 'next/head';
import Link from '../../src/Link';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Oswald',
    fontSize: '1em',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '0.2em',
    width: '80%',
  },
  card: {
    width: '80%',
    margin: '20px auto',
    color: theme.palette.secondary.main,
  },
  userlogo: {
    margin: 'auto 10px',
    height: '100px',
    width: '100px',
    boxShadow: '0px 0px 5px 4px rgba(255,214,255,1)',
  },
}));

const DtPromote = () => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/20efa4bcb4.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Card className={classes.card}>
        <CardActionArea>
          <div style={{ display: 'flex', margin: '20px auto' }}>
            <Avatar
              alt="user logo"
              src={user.pictureUrl}
              className={classes.userlogo}
            />
            {user.state === 'guess' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Typography
                  variant="h3"
                  color="primary"
                  style={{ fontSize: '20px', marginBottom: '20px' }}
                >
                  กรุณาเข้าสู่ระบบ และ ลงทะเบียน
                </Typography>

                <Button
                  component={Link}
                  href="/signin"
                  variant="outlined"
                  color="primary"
                >
                  เข้าสู่ระบบ
                </Button>
              </div>
            ) : user.state === 'student0' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Typography
                  variant="h3"
                  color="primary"
                  style={{ fontSize: '20px', marginBottom: '20px' }}
                >
                  ลงทะเบียน
                </Typography>
                <Button
                  component={Link}
                  href="/user"
                  variant="outlined"
                  color="primary"
                >
                  ลงทะเบียน
                </Button>
              </div>
            ) : (
              <div>
                <List component="nav" aria-label="man detail">
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${user.rank} ${user.firstName} ${user.lastName}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Icon className="fas fa-feather-alt" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={`${user.position}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Icon className="fab fa-font-awesome" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={`${user.base}`} />
                  </ListItem>
                </List>
              </div>
            )}
          </div>
        </CardActionArea>
        <Divider style={{ margin: 'auto', width: '80%' }} />
        {user.state === 'guess' || user.state === 'student0' ? null : (
          <div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                หลักสูตรที่สำเร็จ
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                รายละเอียดหลักสูตร
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                ผลการศึกษา
              </Button>
              <Button size="small" color="primary">
                รายละเอียดเพิ่มเติม
              </Button>
            </CardActions>
            <Divider style={{ margin: 'auto', width: '80%' }} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                หลักสูตรที่สำเร็จ
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                รายละเอียดหลักสูตร
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                ผลการศึกษา
              </Button>
              <Button size="small" color="primary">
                รายละเอียดเพิ่มเติม
              </Button>
            </CardActions>
          </div>
        )}
      </Card>
    </>
  );
};

export default DtPromote;
