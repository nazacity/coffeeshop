import React, { useState, useEffect } from 'react';

// Framer
import { motion } from 'framer-motion';

// Next
import { useRouter } from 'next/router';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import { setStoreProductCatalogs } from '../../redux/actions/productActions';

// Apollo
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_PLACE } from '../../apollo/query';
import { MUTATION_PLACEFROMID } from '../../apollo/mutation';
import { getData, QUERY_STOREPRODUCTCATALOG } from '../../apollo/db';

// Components
import Promotion from '../../components/store/Promotion';
import Menu from '../../components/store';
import Bill from '../../components/store/Bill';

// loadState
import { loadStoreCartsState } from '../../redux/localStore';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Avatar, Typography } from '@material-ui/core';

// Firebase
import { db, firestore } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  top: {
    color: theme.palette.primary.dark,
    position: 'absolute',
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
  },
}));

const index = ({ storeProductCatalog }) => {
  const classes = useStyles();
  const matches600down = useMediaQuery('(max-width:600px)');
  const action = useDispatch();
  useEffect(() => {
    let carts = loadStoreCartsState();
    if (carts === undefined) {
      carts = [];
    }
    action(
      setUser({
        id: 'StoreClient',
        state: 'StoreClient',
        carts: carts,
      })
    );
    action(setStoreProductCatalogs(storeProductCatalog));
  }, []);
  const router = useRouter();

  const { data, loading, error } = useQuery(QUERY_PLACE, {
    variables: {
      id: router.query.place,
    },
    onCompleted: (data) => {
      action(setUser({ table: data.place }));
    },
  });

  const [tableState, setTableState] = useState({ state: 'Open' });

  useEffect(() => {
    firestore
      .collection('tablestate')
      .doc(`${router.query.place}`)
      .get()
      .then((doc) => {
        if (doc.data()) {
          setTableState(doc.data());
        }
      });
  }, [router.query]);

  firestore
    .collection('tablestate')
    .where('id', '==', `${data?.place.id}`)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          setTableState(change.doc.data());
        }
      });
    });

  console.log(setTableState);

  const [placeFromId] = useMutation(MUTATION_PLACEFROMID, {
    variables: {
      id: router.query.place,
    },
    onCompleted: (data) => {
      action(setUser({ table: data.placeFromId }));
    },
  });

  const checkState = () => {
    if (!loading) {
      if (tableState.state == 'Close') {
        return <Menu placeFromId={placeFromId} />;
      } else if (tableState.state == 'Open') {
        return <Promotion />;
      } else if (tableState.state == 'Wait') {
        return <Bill placeFromId={placeFromId} />;
      } else {
        return <Promotion />;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Avatar
            src="./images/logo/logo.jpg"
            alt="logo"
            style={{ width: 200, height: 200, margin: 'auto' }}
          />
          <Typography
            align="center"
            color="primary"
            variant="h6"
            style={{ letterSpacing: 2, marginBottom: '2vh' }}
          >
            ยินดีต้อนรับ
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress
              variant="determinate"
              value={100}
              className={classes.top}
              size={60}
              thickness={4}
            />
            <CircularProgress
              variant="indeterminate"
              disableShrink
              className={classes.bottom}
              size={60}
              thickness={4}
            />
          </div>
        </div>
      )}
      {checkState()}
    </motion.div>
  );
};

export const getStaticProps = async ({ req, res }) => {
  const result = await getData(QUERY_STOREPRODUCTCATALOG);
  const { storeProductCatalog } = result.data;
  return { props: { storeProductCatalog } };
};

export default index;
