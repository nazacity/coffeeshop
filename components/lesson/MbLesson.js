import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Next
import Head from 'next/head';

// Components
import Battalion3 from './Battalion3';
import Battalion2 from './Battalion2';
import Battalion1 from './Battalion1';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const MbLesson = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" type="text/css" href="/styles/video-react.css" />
      </Head>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="ร้อย.บก." {...a11yProps(0)} />
            <Tab label="ร้อย.วศข." {...a11yProps(1)} />
            <Tab label="ร้อย.สวถ." {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Battalion1 />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Battalion2 />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Battalion3 />
        </TabPanel>
      </div>
    </React.Fragment>
  );
};

export default MbLesson;
