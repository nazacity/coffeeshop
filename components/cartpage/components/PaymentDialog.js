import React, { useState } from 'react';

// Next
import Link from 'next/link';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CallIcon from '@material-ui/icons/Call';
import CircularProgress from '@material-ui/core/CircularProgress';

// Component
import GoogleMapComponent from './GoogleMap';
import CheckoutWithCreditCard from './CheckoutWithCreditCard';
import CheckoutWithInternetBanking from './CheckoutWithInternetBanking';

// Apollo
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BRANCH } from '../../../apollo/query';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  top: {
    color: theme.palette.primary.dark,
    position: 'absolute',
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
  },
}));

const PaymentDialog = ({ open, setCheckoutLoading, handleClose, amount }) => {
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const matches600down = useMediaQuery('(max-width:600px)');

  const [distance, setDistance] = useState({
    text: '0',
    value: 0,
  });

  const [center, setCenter] = useState({
    lat: 100,
    lng: 100,
  });

  const [selectedBranch, setSelectedBranch] = useState({
    id: '',
    position: {
      lat: 100.0,
      lng: 100.0,
    },
  });

  const calculateAmount = (amount, distanceNet) => {
    let total;
    total = (amount + Math.ceil(distanceNet)) * 100;
    return total;
  };

  const [indexBranch, setIndexBranch] = useState();

  const { data, loading, error } = useQuery(QUERY_BRANCH, {
    onCompleted: (data) => {
      setSelectedBranch({
        id: data.branch[0].id,
        position: data.branch[0].position,
      });
      setIndexBranch(data.branch[0].id);
    },
  });

  const handleChange = (event) => {
    let branchData = data.branch.find(
      (branch) => branch.id === event.target.value
    );

    setSelectedBranch({
      id: branchData.id,
      position: {
        lat: +branchData.position.lat,
        lng: +branchData.position.lng,
      },
    });
    setIndexBranch(event.target.value);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ดำเนินการชำระเงิน
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {loading ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            className={classes.top}
            size={matches600down ? 60 : 120}
            thickness={4}
          />
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.bottom}
            size={matches600down ? 60 : 120}
            thickness={4}
          />
        </div>
      ) : (
        <div style={{ marginBottom: '100px' }}>
          <Card
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '2vh',
              margin: '2vh auto',
              width: '90%',
            }}
          >
            <Avatar
              src={user.pictureUrl}
              alt={user.firstName}
              style={{
                width: matches1024down ? 60 : 80,
                height: matches1024down ? 60 : 80,
                marginRight: matches1024down ? '1vh' : '2vh',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContents: 'center',
                alignItems: 'center',
              }}
            >
              <Typography color="primary">ผู้รับ</Typography>
              <Typography color="primary" style={{ marginTop: '1vh' }}>
                {user.firstName} {user.lastName}
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContents: 'center',
                alignItems: 'center',
              }}
            >
              <Typography>
                <CallIcon color="primary" />
              </Typography>
              <Typography color="primary">{user.phone}</Typography>
            </div>
          </Card>
          <FormControl
            variant="outlined"
            style={{
              minWidth: 120,
              width: matches1024down ? '95%' : '80%',
              margin: '1vh auto',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <InputLabel id="demo-simple-select-outlined-label">สาขา</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={indexBranch}
              onChange={handleChange}
              label="สาขา"
            >
              {data?.branch.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div
            style={{
              width: matches1024down ? '100%' : '80%',
              margin: '1vh auto',
            }}
          >
            <GoogleMapComponent
              branchPosition={selectedBranch.position}
              setDistance={setDistance}
              center={center}
              setCenter={setCenter}
            />
          </div>
          <AppBar
            position="fixed"
            color="primary"
            style={{
              top: 'auto',
              bottom: 0,
              backgroundColor: '#fff',
            }}
          >
            <div
              style={{
                width: matches1024down ? '90%' : '80%',
                margin: '1vh auto',
                padding: '2vh',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="primary">
                  ค่าอาหาร
                </Typography>
                <Typography variant="body2" color="primary">
                  {amount.toFixed(2)} บาท
                </Typography>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="primary">
                  ค่าจัดส่ง ({distance.text ? distance.text : 'กรุณาเลือกพิกัด'}
                  )
                </Typography>
                <Typography variant="body2" color="primary">
                  {(distance.value
                    ? Math.ceil(distance.value * 0.02)
                    : 0
                  ).toFixed(2)}{' '}
                  บาท
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ fontWeight: 'bold' }}
                >
                  รวม
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ fontWeight: 'bold' }}
                >
                  {(distance.value
                    ? amount + Math.ceil(distance.value * 0.02)
                    : 0
                  ).toFixed(2)}
                  บาท
                </Typography>
              </div>
              <CheckoutWithCreditCard
                amount={calculateAmount(amount, distance.value * 0.02)}
                branchId={selectedBranch.id}
                handleClose={handleClose}
                setCheckoutLoading={setCheckoutLoading}
                center={center}
              />
              <CheckoutWithInternetBanking
                amount={calculateAmount(amount, distance.value * 0.02)}
                branchId={selectedBranch.id}
                handleClose={handleClose}
                setCheckoutLoading={setCheckoutLoading}
                center={center}
              />
            </div>
          </AppBar>
        </div>
      )}
    </Dialog>
  );
};

export default PaymentDialog;
