import React from 'react';

// Next
import Head from 'next/head';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  userlogo: {
    margin: 'auto 10px',
    height: '150px',
    width: '150px',
    border: '5px solid',
    boxShadow: '0px 0px 5px 4px rgba(255,214,255,1)',
  },
  root: {
    width: '100%',
    marginBottom: '100px',
    color: theme.palette.secondary.main,
  },
  card: {
    width: '80%',
    margin: '20px auto',
    color: theme.palette.secondary.main,
  },
}));

const DtUserDetail = () => {
  const theme = useTheme();
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
        />
      </Head>
      <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          maxWidth: '800px',
          margin: 'auto',
          boxShadow: '0px 5px 13px 0px rgba(0,0,0,0.75)',
          height: '100vh',
          paddingTop: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Avatar
            alt="user logo"
            src={user?.pictureUrl}
            className={classes.userlogo}
          />
        </div>
        <div className={classes.root}>
          <Divider />
          <List component="nav" aria-label="man detail">
            <ListItem>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={`${user.rank} ${user.firstName} ${user.lastName}`}
              />
              <IconButton>
                <Icon className="fas fa-pen" color="primary" />
              </IconButton>
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
            <ListItem>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={`${user.email}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CallIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={`${user.phone}`} />
            </ListItem>
          </List>
          <Divider />
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  หลักสูตรที่สำเร็จ
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  รายละเอียดหลักสูตร
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                ผลการศึกษา
              </Button>
              <Button size="small" color="primary">
                รายละเอียดเพิ่มเติม
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DtUserDetail;
