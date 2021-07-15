import React from 'react';
import { Player } from 'video-react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InboxIcon from '@material-ui/icons/MoveToInbox';

// MUI
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Battalion3 = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [video, setVideo] = React.useState({
    title: 'การตัดต่อสาย และผูกสาย',
    src:
      'https://firebasestorage.googleapis.com/v0/b/unitschool-3de31.appspot.com/o/%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A2.%E0%B8%AA%E0%B8%B2%E0%B8%A2.%2F1.mp4?alt=media',
  });
  const matches900down = useMediaQuery('(max-width:900px)');

  return (
    <React.Fragment>
      <div
        style={{
          display: matches900down ? undefined : 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ margin: '1vh auto 0px', flex: 0.7 }}>
          <Typography variant="h5" align="center">
            {video.title}
          </Typography>
          <Player playsInline src={video.src} />
        </div>
        <div style={{ flex: 0.3, margin: '0px auto' }}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                บทเรียน
              </ListSubheader>
            }
            className={classes.root}
          >
            <ListItem
              button
              onClick={() => {
                setVideo({
                  title: 'การตัดต่อสาย และผูกสาย',
                  src:
                    'https://firebasestorage.googleapis.com/v0/b/unitschool-3de31.appspot.com/o/%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A2.%E0%B8%AA%E0%B8%B2%E0%B8%A2.%2F1.mp4?alt=media',
                });
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="การตัดต่อสาย และผูกสาย" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setVideo({
                  title: 'การตั้งเสา STV',
                  src:
                    'https://firebasestorage.googleapis.com/v0/b/unitschool-3de31.appspot.com/o/%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A2.%E0%B8%AA%E0%B8%B2%E0%B8%A2.%2F2.mp4?alt=media',
                });
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="การตั้งเสา STV" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setVideo({
                  title: 'การตั้งเสา tam 18',
                  src:
                    'https://firebasestorage.googleapis.com/v0/b/unitschool-3de31.appspot.com/o/%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A2.%E0%B8%AA%E0%B8%B2%E0%B8%A2.%2F3.mp4?alt=media',
                });
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="การตั้งเสา tam 18" />
            </ListItem>
          </List>
        </div>
      </div>
      <div style={{ margin: '200px' }}></div>
    </React.Fragment>
  );
};

export default Battalion3;
