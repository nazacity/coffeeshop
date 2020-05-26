import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

// Redux
import { connect } from 'react-redux';
import { setUser } from '../../../redux/actions/userActions';
import { setMenuIndex } from '../../../redux/actions/layoutActions';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Next
import Head from 'next/head';
import Router from 'next/router';

// Framer motion
import { motion } from 'framer-motion';

// MUI
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.5em',
    color: theme.common.color.white,
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  TextFieldRoot: {
    margin: '10px auto',
  },
  logo: {
    width: '300px',
    height: '300px',
    margin: 'auto',
    border: '10px solid #764d24',
  },
  top: {
    color: theme.palette.primary.dark,
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  buttonRoot: {
    '&$disabled': {
      color: theme.palette.primary.light,
      backgroundColor: '#e2e2e2',
    },
  },
  disabled: {},
  userlogo: {
    width: '80px',
    height: '80px',
    margin: 'auto',
    border: '5px solid #764d24',
  },
}));

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const MUTATION_REGISTER = gql`
  mutation MUTATION_REGISTER(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $state: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      state: $state
    ) {
      id
      firstName
      lastName
      email
      phone
      state
    }
  }
`;

const DtRegister = ({ setUser, user, setMenuIndex }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { control, handleSubmit, reset, errors } = useForm();
  const [openDialog, setOpenDialog] = useState(false);
  const [userData, setUserData] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
    Router.push('/');
    setMenuIndex(0);
    setUser(userData);
  };

  const [resiter, { loading, error }] = useMutation(MUTATION_REGISTER, {
    onCompleted: (data) => {
      setUserData(data.register);
      reset(defaultValues);
      setOpenDialog(true);
    },
  });

  const onSubmit = (data) => {
    resiter({
      variables: {
        firstName: data.firstName.toLowerCase(),
        lastName: data.lastName.toLowerCase(),
        email: data.email.toLowerCase(),
        phone: data.phone,
        state: 'client1',
      },
    });
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
        style={{ marginTop: '50px', marginBottom: '10px' }}
        className="nav-logo"
      >
        <Avatar
          alt="line logo"
          src="./images/logo/logo.jpg"
          className={classes.logo}
        />
      </motion.div>
      <div style={{ width: '50%', margin: '20px auto' }}>
        <div
          style={{
            backgroundColor: theme.common.color.navColor,
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
          }}
        >
          <Typography
            variant="h2"
            className={classes.title}
            style={{ letterSpacing: '5px', margin: 'auto' }}
          >
            ลงทะเบียน
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={TextField}
            name="firstName"
            control={control}
            defaultValue=""
            label="ชื่อ"
            variant="outlined"
            rules={{
              required: 'กรุณากรอกชื่อ',
            }}
            error={errors.firstName && true}
            helperText={errors.firstName?.message}
            fullWidth
            size="small"
            classes={{ root: classes.TextFieldRoot }}
            disabled={loading}
          />
          <Controller
            as={TextField}
            name="lastName"
            control={control}
            defaultValue=""
            label="นามสกุล"
            variant="outlined"
            rules={{
              required: 'กรุณากรอกนามสกุล',
            }}
            error={errors.lastName && true}
            helperText={errors.lastName?.message}
            fullWidth
            size="small"
            classes={{ root: classes.TextFieldRoot }}
            disabled={loading}
          />
          <Controller
            as={TextField}
            name="email"
            control={control}
            defaultValue=""
            label="อีเมล"
            variant="outlined"
            rules={{
              required: 'กรุณากรอกอีเมล',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'กรุณากรอกอีเมลที่ถูกต้อง',
              },
            }}
            error={errors.email && true}
            helperText={errors.email?.message}
            fullWidth
            size="small"
            classes={{ root: classes.TextFieldRoot }}
            disabled={loading}
          />
          <Controller
            as={TextField}
            name="phone"
            control={control}
            defaultValue=""
            label="เบอร์โทรศัพท์"
            variant="outlined"
            rules={{
              required: 'กรุณากรอกเบอร์โทรศัพท์',
              minLength: {
                value: 10,
                message: 'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง',
              },
              maxLength: {
                value: 10,
                message: 'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง',
              },
            }}
            error={errors.phone && true}
            helperText={errors.phone?.message}
            fullWidth
            size="small"
            classes={{ root: classes.TextFieldRoot }}
            disabled={loading}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px',
              marginBottom: '50px',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: '2em' }}
              disabled={loading}
              classes={{ root: classes.buttonRoot, disabled: classes.disabled }}
            >
              ลงทะเบียน
              {loading && (
                <div style={{ position: 'absolute', display: 'flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    className={classes.top}
                    size={24}
                    thickness={4}
                  />
                  <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    className={classes.bottom}
                    size={24}
                    thickness={4}
                  />
                </div>
              )}
            </Button>
            <Button
              type="button"
              onClick={() => {
                reset(defaultValues);
              }}
              variant="outlined"
              color="primary"
            >
              ยกเลิก
            </Button>
          </div>
        </form>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
            }}
            style={{ margin: '100px auto' }}
          >
            <DialogActions
              style={{
                displa: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt="user logo"
                src={user?.pictureUrl}
                className={classes.userlogo}
              />
              <div style={{ margin: '50px auto', overflow: 'hidden' }}>
                <Typography variant="h5" align="center" color="primary">
                  ขอบคุณที่ลงทะเบียนค่ะ
                </Typography>
              </div>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={handleDialogClose}
              >
                กลับสู่หน้าแรก
              </Button>
            </DialogActions>
          </motion.div>
        </Dialog>
      </motion.div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {
  setUser,
  setMenuIndex,
};

export default connect(mapStateToProps, mapActionToProps)(DtRegister);
