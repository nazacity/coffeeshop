import React from 'react';

// Next
import Head from 'next/head';
import Link from '../../src/Link';

//Framer-motion
import { motion } from 'framer-motion';

// Mui
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
<<<<<<< HEAD
import Typography from '@material-ui/core/Typography';
=======
>>>>>>> 37c893abbc5e15ee31a9e383d21402e36944409a
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// Components
import DtPromote from './DtPromote';

const useStyles = makeStyles((theme) => ({
  avatarmb: {
    width: '80px',
    height: '80px',
    boxShadow: '0px 0px 5px 4px rgba(255,214,255,1)',
    top: '-20px',
    background: '#fff',
    margin: 'auto 10px',
  },
}));

const MbHero = () => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/styles/float.css" />
        <script
          src="https://kit.fontawesome.com/20efa4bcb4.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          maxWidth: '800px',
          margin: 'auto',
          boxShadow: '0px 5px 13px 0px rgba(0,0,0,0.75)',
          paddingBottom: '100px',
        }}
      >
        <motion.div style={{ height: '300px', overflow: 'hidden' }}>
          <img
            src="./images/hero/hero.jpg"
            alt="12th signal"
            style={{ width: '100%', hegiht: '100%' }}
          />
        </motion.div>
        <div style={{ display: 'flex' }}>
          <motion.div className="nav-logo" style={{ flexGrow: 1 }}>
            <Avatar src="./images/logo/logo.png" className={classes.avatarmb} />
          </motion.div>
          <motion.div>
            <IconButton>
              <a href="https://www.facebook.com/%E0%B8%81%E0%B8%AD%E0%B8%87%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B5%E0%B9%88-%E0%B9%91%E0%B9%92-317512615013738/">
                <Icon
                  className="fab fa-facebook-square"
                  style={{
                    color: 'black',
                    marginRight: '0.5rem',
                    fontSize: '2rem',
                  }}
                />
              </a>
            </IconButton>
            <IconButton>
              <Icon
                className="fab fa-twitter-square"
                style={{
                  color: 'black',
                  marginRight: '0.5rem',
                  fontSize: '2rem',
                }}
              />
            </IconButton>
            <IconButton>
              <Icon
                className="fab fa-instagram-square"
                style={{
                  color: 'black',
                  marginRight: '0.5rem',
                  fontSize: '2rem',
                }}
              />
            </IconButton>
          </motion.div>
        </div>
        <Typography
          variant="h2"
          color="primary"
          style={{ fontSize: '18px' }}
          align="center"
        >
          กองพันทหารสื่อสารที่ 12 UNIT SCHOOL
        </Typography>
        <DtPromote />
      </motion.div>
    </>
  );
};

export default MbHero;
