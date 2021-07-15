import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addOnlineItemCart } from '../../redux/actions/userActions';

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
    minWidth: '150px',
    width: '15vw',
    maxWidth: '300px',
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
    <div className={classes.cardRoot}>
      <CardActionArea>
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '2vh',
            borderRadius: '5px 5px 0 0',
            display: 'flex',
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <Typography align="left" variant="body1" style={{ color: '#fff' }}>
              {object.name}
            </Typography>
            <Typography align="left" variant="body1" style={{ color: '#fff' }}>
              {object.price} บาท
            </Typography>
          </div>

          <motion.div
            style={{
              zIndex: 2,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              style={{
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                width: '40px',
                height: '40px',
              }}
              onClick={() => {
                action(addOnlineItemCart(object));
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
        </div>
        <div
          style={{
            minHeight: '100px',
            height: '10vw',
            maxHeight: '150px',
            width: '100%',
            backgroundImage: `url(${object.pictureUrl})`,
            backgroundSize: 'contain,cover',
            backgroundPositionX: '50%',
            backgroundRepeat: 'no-repeat',
            margin: 'auto',
          }}
        ></div>
      </CardActionArea>
    </div>
  );
};

export default ProductMenuItem;
