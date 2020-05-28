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
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PLACE } from '../../apollo/query';
import { getData, QUERY_STOREPRODUCTCATALOG } from '../../apollo/db';

// Components
import Promotion from '../../components/store/Promotion';
import Menu from '../../components/store';
import BillDisplay from '../../components/store/components/BillDisplay';

// loadState
import { loadStoreCartsState } from '../../redux/localStore';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
  const [state, setState] = useState('Open');
  const router = useRouter();

  console.log(router.query.place);

  const { data, loading, error } = useQuery(QUERY_PLACE, {
    variables: {
      id: router.query.place,
    },
    onCompleted: (data) => {
      console.log(data);
      setState(data.place.state);
      action(setUser({ table: data.place }));
    },
  });

  const checkState = () => {
    if (!loading) {
      if (state == 'Close') {
        return <Menu />;
      } else if (state == 'Open') {
        return <Promotion />;
      } else if (state == 'Wait') {
        return <BillDisplay />;
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
