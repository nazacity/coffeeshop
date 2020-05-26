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
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// Other
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  userlogo: {
    margin: 'auto 10px',
    height: '150px',
    width: '150px',
    border: '5px solid',
    borderColor: theme.common.color.navColor,
  },
  root: {
    width: '100%',
    marginBottom: '100px',
    color: theme.palette.secondary.main,
  },
}));

const ORDER_HISTORY_DATA = [
  {
    id: '1',
    createdAt: { _seconds: 1588226407, _nanoseconds: 510000000 },
    orderList: [
      {
        price: 120,
        name: 'อเมริกาโน่ร้อน',
        pictureUrl: './images/product/drink/1.png',
        quantity: 2,
      },
      {
        price: 120,
        name: 'เบอร์เกอร์เนื้อ',
        pictureUrl: './images/product/food/1.png',
        quantity: 2,
      },
      {
        price: '130',
        name: 'สเต็กปลา',
        pictureUrl: './images/product/food/6.png',
        quantity: 1,
      },
    ],
  },
  {
    id: '2',
    createdAt: { _seconds: 1588526407, _nanoseconds: 510000000 },
    orderList: [
      {
        price: 150,
        name: 'แซนวิท',
        pictureUrl: './images/product/food/4.png',
        quantity: 2,
      },
      {
        id: 6,
        price: '130',
        name: 'อิตลาเลียนโซดา บลูฮาวาย',
        pictureUrl: './images/product/drink/6.png',
        quantity: 2,
      },
    ],
  },
];

const MbUserDetail = () => {
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
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2rem auto',
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
            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
            <IconButton>
              <Icon className="fas fa-pen" color="primary" />
            </IconButton>
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
        <List component="nav" aria-label="address">
          <ListItem>
            <ListItemIcon>
              <Icon className="fas fa-list-ul" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Order History" />
          </ListItem>
        </List>
        <div style={{ padding: '0 10px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr',
              width: '100%',
            }}
          >
            <h3 style={{ margin: 'auto' }}></h3>
            <h3 style={{ margin: 'auto' }}>รายการ</h3>
            <h3 style={{ margin: 'auto' }}>จำนวน</h3>
            <h3 style={{ margin: 'auto' }}>ราคา</h3>
          </div>
          <Divider style={{ width: '60%', margin: '20px auto' }} />
          {ORDER_HISTORY_DATA.map((orderHistory) => (
            <div key={orderHistory.id}>
              <div style={{ margin: 'auto' }}>
                {moment
                  .unix(orderHistory.createdAt._seconds)
                  .format('DD/MM/YYYY')}
              </div>
              {orderHistory.orderList.map((order) => (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 1fr 1fr',
                    width: '100%',
                    color: theme.palette.secondary.main,
                  }}
                  key={order.name}
                >
                  <Avatar
                    alt={order.name}
                    src={order.pictureUrl}
                    style={{ margin: 'auto' }}
                  />
                  <p style={{ marginRight: '1rem' }}>{order.name}</p>
                  <p style={{ margin: 'auto' }}>{order.quantity}</p>
                  <p style={{ margin: 'auto' }}>
                    {order.price * order.quantity}
                  </p>
                </div>
              ))}
              <Divider style={{ width: '60%', margin: '20px auto' }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MbUserDetail;
