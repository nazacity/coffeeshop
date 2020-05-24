import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import {
  getData,
  QUERY_PRODUCTS,
  QUERY_CATALOGS,
  getUserByAccessToken,
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
import DtProducts from '../../components/productpage/DtProducts';

// MUI
import Hidden from '@material-ui/core/Hidden';
import MbProducts from '../../components/productpage/MbProduct';

// Other
import cookie from 'cookie';
import Cookies from 'js-cookie';
import Script from 'react-load-script';

const ProductPage = ({ products, catalog, user }) => {
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
    action(setOnlineProductCatalogs(products));
    action(setUser(user ? user : null));
  }, [products, user]);

  const handleLiff = async () => {
    let accessToken;
    await liff.init({ liffId: '1654152621-VPO8YoR1' });
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
    <Container maxWidth={false}>
      <Script
        url="https://static.line-scdn.net/liff/edge/2.1/sdk.js"
        onLoad={() => handleLiff()}
      />
      <Hidden smDown>
        <DtProducts catalog={catalog} />
      </Hidden>
      <Hidden mdUp>
        <MbProducts catalog={catalog} />
      </Hidden>
    </Container>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const resultProducts = await getData(QUERY_PRODUCTS);
  const resultCatalogs = await getData(QUERY_CATALOGS);
  let products = resultProducts.data.products;
  let catalogs = resultCatalogs.data.catalogs;

  let result = [];
  catalogs.map((catalog, i) => {
    result.push({
      name: catalog.name,
      th: catalog.th,
      data: products.filter((product) => product.catalog === catalog.name),
    });
  });
  const { headers } = req;

  const cookies = headers && cookie.parse(headers.cookie || '');
  const accessToken = cookies && cookies.accessToken;

  if (accessToken) {
    const user = await getUserByAccessToken(accessToken);
    return { props: { products, catalog: result, user } };
  }
  return { props: { products, catalog: result, user: {} } };
};

export default ProductPage;
