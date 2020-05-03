import React from 'react';

// Next
import Head from 'next/head';

// Framer-motion
import { motion } from 'framer-motion';

// Mui
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  large: {
    width: '300px',
    height: '300px',
    margin: 'auto',
    border: '10px solid #764d24',
  },
  brandname: {
    color: 'white',
    fontFamily: 'Paprika',
    fontSize: '4.5em',
  },
}));

const DtHero = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/styles/float.css" />
      </Head>
      <motion.div
        style={{
          height: '50vh',
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          zIndex: -1,
        }}
        initial={{ opacity: 0, y: '-40%' }}
        animate={{ opacity: 1, y: '0%' }}
        exit={{
          opacity: 0,
          y: '-40%',
        }}
        transition={{
          duration: 1.6,
          ease: 'easeInOut',
        }}
      >
        <img
          src="./images/hero/dthero.jpg"
          alt="coffee shop"
          style={{ width: '100%' }}
        />
      </motion.div>
      <motion.div
        style={{ paddingTop: '20px', marginBottom: '2em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 1.2, ease: 'easeInOut' },
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
          className={classes.large}
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
            width: matchesMD ? '50%' : '40%',
            height: '3em',
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
            transition: { duration: 1.2, ease: 'easeInOut' },
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

export default DtHero;
