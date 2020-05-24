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

// loadState
import { loadCartsState } from '../../redux/localStore';

const index = ({ storeProductCatalog }) => {
  const action = useDispatch();
  useEffect(() => {
    let carts = loadCartsState();
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
  const [state, setState] = useState({
    state: 'Close',
  });
  const router = useRouter();

  const { data, loading, error } = useQuery(QUERY_PLACE, {
    variables: {
      id: router.query.place,
    },
    onCompleted: (data) => {
      setState(data.place);
      action(setUser({ table: data.place }));
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {loading && <div>loading</div>}
      {!loading && state.state === 'Open' ? (
        <Promotion />
      ) : !loading && state.state === 'Close' ? (
        <Menu />
      ) : (
        !loading && state.state === 'Waiting' && <div>Checking</div>
      )}
    </motion.div>
  );
};

export const getStaticProps = async ({ req, res }) => {
  const result = await getData(QUERY_STOREPRODUCTCATALOG);
  const { storeProductCatalog } = result.data;
  return { props: { storeProductCatalog } };
};

export default index;
