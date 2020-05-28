import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addStoreItemCart } from '../../../redux/actions/userActions';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Toast
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles((theme) => ({
  top: {
    color: theme.palette.primary.dark,
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  media: {
    height: '10vh',
  },
  cardRoot: {
    minWidth: '200px',
    width: '20vw',
    maxWidth: '300px',
    boxShadow: theme.common.shadow.black,
    borderRadius: '5px',
    overflow: 'hidden',
    paddingBottom: '2vh',
  },
}));

const ProductMenuItem = ({ object, i }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const { addToast } = useToasts();

  const action = useDispatch();

  return (
    <Card className={classes.cardRoot}>
      <CardActionArea>
        <div
          style={{
            minHeight: '150px',
            height: '20vw',
            maxHeight: '300px',
            width: '100%',
            backgroundImage: `url(${object.pictureUrl})`,
            backgroundSize: 'contain,cover',
            backgroundPositionX: '50%',
            backgroundRepeat: 'no-repeat',
            margin: 'auto',
          }}
        ></div>
      </CardActionArea>
      <motion.div
        style={{
          position: 'relative',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <IconButton
          aria-label="add"
          style={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            position: 'absolute',
            right: 10,
            top: -25,
            border: '5px solid #fff',
            width: '60px',
            height: '60px',
          }}
          onClick={() => {
            action(addStoreItemCart(object));
            const content = (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={object.pictureUrl}
                  alt={object.name}
                  style={{
                    marginRight: '1vh',
                    backgroundColor: '#fff',
                    boxShadow: theme.common.shadow.black,
                  }}
                />
                <Typography>เพิ่ม {object.name} เรียบร้อย</Typography>
              </div>
            );
            addToast(content, {
              appearance: 'success',
              autoDismiss: true,
            });
          }}
        >
          <AddIcon />
        </IconButton>
      </motion.div>
      <CardContent>
        <div>
          <Typography align="center" variant="body1" color="primary">
            {object.name}
          </Typography>
          <Typography align="center" variant="body1" color="primary">
            {object.price} บาท
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductMenuItem;
