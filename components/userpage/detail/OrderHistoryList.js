import React, { useState } from 'react';

// MUI
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// momnet
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const OrderHistoryList = ({ order }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <div style={{ marginRight: 'auto' }}>
          {moment(order.createdAt).format('DD/MM/YYYY')}
        </div>
        {open ? <ExpandMore /> : <ExpandLess />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {order.items.map((item) => (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr',
              width: '100%',
              color: theme.palette.secondary.main,
              margin: '1vh auto',
            }}
            key={item.id}
          >
            <Avatar
              alt={item.name}
              src={item.onlineProduct.pictureUrl}
              style={{ margin: 'auto' }}
            />
            <p style={{ margin: 'auto' }}>{item.onlineProduct.name}</p>
            <p style={{ margin: 'auto' }}>{item.quantity}</p>
            <p style={{ margin: 'auto' }}>
              {item.onlineProduct.price * item.quantity}
            </p>
          </div>
        ))}
      </Collapse>
      <Divider style={{ width: '80%', margin: '20px auto' }} />
    </React.Fragment>
  );
};

export default OrderHistoryList;
