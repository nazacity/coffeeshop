import React from 'react';

// Next
import Head from 'next/head';

//Framer-motion
import { motion } from 'framer-motion';

// Mui
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// Components
import DtPromote from './DtPromote';

const useStyles = makeStyles((theme) => ({
  avatarmb: {
    minHeight: '80px',
    minWidth: '80px',
    maxWidth: '150px',
    maxHeight: '150px',
    width: '20vw',
    height: '20vw',
    boxShadow: theme.common.shadow.main,
    margin: 'auto 3vw',
    top: '-30px',
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

const socialMediaIcon = [
  {
    name: 'facbook',
    icon: 'fab fa-facebook-square',
    link: '#',
  },
  {
    name: 'twitter',
    icon: 'fab fa-twitter-square',
    link: '#',
  },
  {
    name: 'instagram',
    icon: 'fab fa-instagram-square',
    link: '#',
  },
];

const MbHero = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/styles/float.css" />
        <script
          src="https://kit.fontawesome.com/20efa4bcb4.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <div
        style={{
          minHeight: '20vh',
          maxHeight: '30vh',
          hegiht: '40vw',
          overflow: 'hidden',
        }}
      >
        <motion.img
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
          src="./images/hero/dthero.jpg"
          alt="coffee shop"
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      <div
        style={{
          maxWidth: theme.layer.maxwidth,
          margin: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '80%',
            margin: 'auto',
          }}
        >
          <motion.div
            style={{ flexGrow: 1 }}
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
              delay: 1.2,
            }}
            className="nav-logo"
          >
            <Avatar
              alt="Remy Sharp"
              src="/images/logo/logo.jpg"
              className={classes.avatarmb}
            />
          </motion.div>
          <div>
            {socialMediaIcon.map((icon, i) => (
              <IconButton key={icon.name}>
                <motion.a
                  initial={{ y: '30%', opacity: 0 }}
                  animate={{
                    y: '0%',
                    opacity: 1,
                    transition: {
                      ease: 'easeOut',
                      duration: 0.4 * (i + 1),
                      delay: 1.8,
                    },
                  }}
                  exit={{
                    y: '30%',
                    opacity: 0,
                    transition: {
                      ease: 'easeIn',
                      duration: 0.8,
                    },
                  }}
                  href={icon.link}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon
                    className={icon.icon}
                    style={{
                      color: 'black',
                      fontSize: '2.5rem',
                    }}
                  />
                </motion.a>
              </IconButton>
            ))}
          </div>
        </div>
        <DtPromote />
      </div>
      <div
        style={{
          paddingBottom: '5vh',
        }}
      />
    </>
  );
};

export default MbHero;
