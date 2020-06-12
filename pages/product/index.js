import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import {
  getData,
  getUserByAccessToken,
  QUERY_ONLINEPRODUCTCATALOG,
} from '../../apollo/db';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_SIGNINWITHACCESSTOKEN } from '../../apollo/mutation';

// Redux
import { useDispatch } from 'react-redux';
import { setOnlineProductCatalogs } from '../../redux/actions/productActions';
import { setUser } from '../../redux/actions/userActions';
import { setUserLoading } from '../../redux/actions/layoutActions';

// Components
import OnlineProductDisplay from '../../components/productpage/OnlineProductDisplay';

// Other
import cookie from 'cookie';
import Cookies from 'js-cookie';
import Script from 'react-load-script';

// loadState
import { loadOnlineCartsState } from '../../redux/localStore';

// Framer
import { motion } from 'framer-motion';

const ProductPage = ({ onlineProductCatalog, user }) => {
  const action = useDispatch();
  const [signinWithAccessToken, { loading, error }] = useMutation(
    MUTATION_SIGNINWITHACCESSTOKEN,
    {
      onCompleted: (data) => {
        action(setUser(data.signinWithAccessToken));
        action(setUserLoading(false));
      },
    }
  );

  useEffect(() => {
    let carts = loadOnlineCartsState();
    if (carts === undefined) {
      carts = [];
    }
    action(setOnlineProductCatalogs(onlineProductCatalog));
    action(setUser(user ? { ...user, carts } : null));
  }, [onlineProductCatalog, user]);

  const handleLiff = async () => {
    let accessToken;
    await liff.init({ liffId: '1654312839-2BOaM90o' });
    accessToken = await liff.getAccessToken();
    if (accessToken) {
      Cookies.set('accessToken', accessToken);
      action(setUserLoading(true));
      signinWithAccessToken({
        variables: {
          accessToken,
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Script
        url="https://static.line-scdn.net/liff/edge/2.1/sdk.js"
        onLoad={() => handleLiff()}
      />
      <OnlineProductDisplay />
    </motion.div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const resultOnelineCatalogs = await getData(QUERY_ONLINEPRODUCTCATALOG);
  let { onlineProductCatalog } = resultOnelineCatalogs.data;

  const { headers } = req;

  const cookies = headers && cookie.parse(headers.cookie || '');
  const accessToken = cookies && cookies.accessToken;

  if (accessToken) {
    const user = await getUserByAccessToken(accessToken);
    return { props: { onlineProductCatalog, user } };
  }
  return { props: { onlineProductCatalog, user: {} } };
};

export default ProductPage;
