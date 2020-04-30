import React from 'react';

// Next
import Head from 'next/head';

//Framer-motion
import { motion } from 'framer-motion';

// Mui
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  avatarmb: {
    width: '120px',
    height: '120px',
    margin: 'auto',
    border: '5px solid',
    borderColor: theme.palette.primary.main,
  },
  brandname: {
    color: 'white',
    fontSize: '2em',
    fontFamily: 'Paprika',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2em',
    },
  },
}));

const MbHero = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/styles/float.css" />
      </Head>
      <motion.div
        style={{
          height: '30vh',
          overflow: 'hidden',
          zIndex: -1,
          position: 'absolute',
        }}
        initial={{ y: '-40%' }}
        animate={{ y: '0%' }}
        exit={{
          y: '-40%',
          opacity: 0,
          transition: {
            duration: 1.6,
            ease: 'easeInOut',
          },
        }}
        transition={{
          duration: 1.6,
          ease: 'easeInOut',
        }}
      >
        <img
          src="./images/hero/dthero.jpg"
          alt="coffee shop"
          style={{ height: '100%', width: '100%' }}
        />
      </motion.div>
      <motion.div
        style={{ paddingTop: '20px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: {
            duration: 1.2,
            ease: 'easeInOut',
          },
        }}
        transition={{
          duration: 1.2,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="nav-logo"
      >
        <Avatar
          alt="Remy Sharp"
          src="/images/logo/logo.jpg"
          className={classes.avatarmb}
        />
      </motion.div>
      <div
        style={{
          height: '6em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            background: '#a97743',
            width: '70%',
            height: '2em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
          }}
          initial={{ opacity: 0, y: '40%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{
            opacity: 0,
            y: '40%',
            transition: {
              duration: 1.2,
              ease: 'easeInOut',
            },
          }}
          transition={{
            duration: 1.2,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <Typography variant="h1" className={classes.brandname}>
            KAFFY COFFEE
          </Typography>
        </motion.div>
      </div>
    </>
  );
};

export default MbHero;
