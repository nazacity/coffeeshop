import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import {
  getData,
  QUERY_PRODUCTS,
  QUERY_CATALOGS,
  getUserByAccessToken,
} from '../../apollo/db';

// Redux
import { useDispatch } from 'react-redux';
import { setProducts } from '../../redux/actions/productActions';
import { setUser } from '../../redux/actions/userActions';

// Components
import DtProducts from '../../components/productpage/DtProducts';

// MUI
import Hidden from '@material-ui/core/Hidden';
import MbProducts from '../../components/productpage/MbProduct';

// Other
import cookie from 'cookie';

const ProductPage = ({ products, catalog, user }) => {
  const action = useDispatch();

  useEffect(() => {
    action(setProducts(products));
    action(setUser(user ? user : null));
  }, [products, user]);

  return (
    <Container maxWidth={false}>
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

  const user = await getUserByAccessToken(accessToken);
  return { props: { products, catalog: result, user } };
};

export default ProductPage;
