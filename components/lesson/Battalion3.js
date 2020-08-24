import React from 'react';
import { Player } from 'video-react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import YouTubeIcon from '@material-ui/icons/YouTube';

// MUI
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
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

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '2vh', margin: '1vh auto', flex: 0.7 }}>
          <Typography variant="h5" align="center">
            {video.title}
          </Typography>
          <Player playsInline src={video.src} />
        </div>
        <div style={{ flex: 0.3 }}>
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
