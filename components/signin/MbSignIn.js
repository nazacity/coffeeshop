import React from 'react';

// Next
import Head from 'next/head';

// Framer motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  logo: {
    width: '150px',
    height: '150px',
    margin: 'auto',
    boxShadow: '0px 0px 5px 4px rgba(255,214,255,1)',
    paddingTop: '10px',
  },
  loginbutton: {
    backgroundColor: '#00C300',
    border: 'none',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#00E000',
    },
    '&:focus': {
      backgroundColor: '#00B300',
    },
  },
  loginsubdetail: {
    fontSize: '16px',
  },
}));

const MbSignIn = () => {
  const classes = useStyles();

  const client_id = process.env.LINE_CLIENT_KEY;
  console.log(process.env.LINE_CLIENT_KEY);
  const redirect = process.env.LINE_REDIRECT_LINK;
  const scope = 'openid%20profile%20email';
  const state = 'unitschool';
  const lineloginlink = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect}&state=${state}&scope=${scope}`;

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/styles/float.css" />
      </Head>
      <motion.div
        initial={{ opacity: 0, y: '-20%' }}
        animate={{ opacity: 1, y: '0%' }}
        exit={{ opacity: 0, y: '-20%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ marginTop: '10%', marginBottom: '30px' }}
        className="nav-logo"
      >
        <Avatar
          alt="line logo"
          src="./images/logo/logo.png"
          className={classes.logo}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <a href={lineloginlink}>
          <Button variant="contained" className={classes.loginbutton}>
            <img
              src="./images/signin/linebutton.png"
              alt="linebutton"
              style={{ width: '30px', height: '30px', marginRight: '10px' }}
            />
            <span style={{ color: '#fff' }}>เข้าสู่ระบบด้วย LINE</span>
          </Button>
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
      ></motion.div>
    </>
  );
};

export default MbSignIn;
