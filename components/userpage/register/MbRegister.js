import React from 'react';
import { useForm, Controller } from 'react-hook-form';

// Next
import Head from 'next/head';

// Framer motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '1.5em',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  TextFieldRoot: {
    margin: '10px auto'
  },
  logo: {
    width: '150px',
    height: '150px',
    margin: 'auto',
    border: '10px solid #764d24'
  }
}));

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
};

const MbRegister = () => {
  const classes = useStyles();
  const { control, handleSubmit, reset, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

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
          src="./images/logo/logo.jpg"
          className={classes.logo}
        />
      </motion.div>
      <Typography variant="h2" className={classes.title} align="center">
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={TextField}
          name="firstName"
          control={control}
          defaultValue=""
          label="FIRST NAME"
          variant="outlined"
          rules={{
            required: 'First Name is required'
          }}
          error={errors.firstName && true}
          helperText={errors.firstName?.message}
          fullWidth
          size="small"
          classes={{ root: classes.TextFieldRoot }}
        />
        <Controller
          as={TextField}
          name="lastName"
          control={control}
          defaultValue=""
          label="LAST NAME"
          variant="outlined"
          rules={{
            required: 'Last Name is required'
          }}
          error={errors.lastName && true}
          helperText={errors.lastName?.message}
          fullWidth
          size="small"
          classes={{ root: classes.TextFieldRoot }}
        />
        <Controller
          as={TextField}
          name="email"
          control={control}
          defaultValue=""
          label="EMAIL"
          variant="outlined"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Please fill valid email'
            }
          }}
          error={errors.email && true}
          helperText={errors.email?.message}
          fullWidth
          size="small"
          classes={{ root: classes.TextFieldRoot }}
        />
        <Controller
          as={TextField}
          name="phone"
          control={control}
          defaultValue=""
          label="PHONE NUMBER"
          variant="outlined"
          rules={{
            required: 'Phone Number is required',
            minLength: { value: 10, message: 'Please fill valid phone number' },
            maxLength: { value: 10, message: 'Please fill valid phone number' }
          }}
          error={errors.phone && true}
          helperText={errors.phone?.message}
          fullWidth
          size="small"
          classes={{ root: classes.TextFieldRoot }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            marginBottom: '50px'
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginRight: '2em' }}
          >
            Confirm
          </Button>
          <Button
            type="button"
            onClick={() => {
              reset(defaultValues);
            }}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default MbRegister;
