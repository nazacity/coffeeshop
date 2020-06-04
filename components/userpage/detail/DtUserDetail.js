import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// MUI
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
import Typography from '@material-ui/core/Typography';

// Components
import OrderHistoryList from './OrderHistoryList';

const DtUserDetail = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <div style={{ maxWidth: '1280px', margin: 'auto', width: '80%' }}>
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
            style={{
              margin: 'auto 10px',
              height: '150px',
              width: '150px',
              border: '5px solid',
              borderColor: theme.common.color.navColor,
            }}
          />
        </div>
        <div
          style={{
            width: '100%',
            marginBottom: '100px',
            color: theme.palette.secondary.main,
          }}
        >
          <Divider style={{ width: '80%', margin: 'auto' }} />
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
          <Divider style={{ width: '80%', margin: 'auto' }} />
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
            <List>
              {user.orders !== [] ? (
                user.orders.map((order) => (
                  <OrderHistoryList key={order.id} order={order} />
                ))
              ) : (
                <Typography align="center">ยังไม่มีรายการสั่งซื้อ</Typography>
              )}
            </List>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DtUserDetail;
