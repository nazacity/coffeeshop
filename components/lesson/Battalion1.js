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

const Battalion1 = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [video, setVideo] = React.useState({
    title: 'การฝึกช่างภาพ ตอนที่ 1',
    src:
      'https://firebasestorage.googleapis.com/v0/b/unitschool-3de31.appspot.com/o/%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A2.%E0%B8%9A%E0%B8%81.%2FUnit%20School%20%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A0%E0%B8%B2%E0%B8%9E%2018%20%E0%B8%A1%E0%B8%B4.%E0%B8%A2.63%20.mp4?alt=media&token=ebe8f6fe-399f-4b78-847f-b61827ffb089',
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
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="การฝึกช่างภาพ" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    setVideo({
                      title: 'การฝึกช่างภาพ ตอนที่ 1',
                      src:
                        'https://firebasestorage.googleapis.com/v0/b/unitschool-3de31.appspot.com/o/%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A2.%E0%B8%9A%E0%B8%81.%2FUnit%20School%20%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A0%E0%B8%B2%E0%B8%9E%2018%20%E0%B8%A1%E0%B8%B4.%E0%B8%A2.63%20.mp4?alt=media&token=ebe8f6fe-399f-4b78-847f-b61827ffb089',
                    });
                  }}
                >
                  <ListItemIcon>
                    <YouTubeIcon />
                  </ListItemIcon>
                  <ListItemText primary="ตอนที่ 1" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    setVideo({
                      title: 'การฝึกช่างภาพ ตอนที่ 2',
                      src:
                        'https://firebasestorage.googleapis.com/v0/b/unitschool-3de31.appspot.com/o/%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A2.%E0%B8%9A%E0%B8%81.%2FUnit%20School%20%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A0%E0%B8%B2%E0%B8%9E%2018%20%E0%B8%A1%E0%B8%B4.%E0%B8%A2.63%20(1)%20.mp4?alt=media&token=3940ed82-7454-41bd-a40e-020c1dde0219',
                    });
                  }}
                >
                  <ListItemIcon>
                    <YouTubeIcon />
                  </ListItemIcon>
                  <ListItemText primary="ตอนที่ 2" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    setVideo({
                      title: 'การฝึกช่างภาพ ตอนที่ 3',
                      src:
                        'https://firebasestorage.googleapis.com/v0/b/unitschool-3de31.appspot.com/o/%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A2.%E0%B8%9A%E0%B8%81.%2FUnit%20School%20%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A0%E0%B8%B2%E0%B8%9E%2019%20%E0%B8%A1%E0%B8%B4.%E0%B8%A2.63.mp4?alt=media&token=54536235-a9bf-43b7-8d55-425786bee130',
                    });
                  }}
                >
                  <ListItemIcon>
                    <YouTubeIcon />
                  </ListItemIcon>
                  <ListItemText primary="ตอนที่ 3" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    setVideo({
                      title: 'การฝึกช่างภาพ ตอนที่ 4',
                      src:
                        'https://firebasestorage.googleapis.com/v0/b/unitschool-3de31.appspot.com/o/%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A2.%E0%B8%9A%E0%B8%81.%2FUnit%20School%20%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%A0%E0%B8%B2%E0%B8%9E%2019%20%E0%B8%A1%E0%B8%B4.%E0%B8%A2.63%20(1).mp4?alt=media&token=16d27476-1c20-4754-bc52-f030e66ab682',
                    });
                  }}
                >
                  <ListItemIcon>
                    <YouTubeIcon />
                  </ListItemIcon>
                  <ListItemText primary="ตอนที่ 4" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>
      </div>
      <div style={{ margin: '200px' }}></div>
    </React.Fragment>
  );
};

export default Battalion1;
