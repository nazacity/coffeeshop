import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { getData } from '../../db';

// Redux
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { setProducts } from '../../redux/actions/productActions';

// Apollo
import { useQuery } from '@apollo/react-hooks';
//import { QUERY_CATALOGS } from '../../apollo/query';

// Components
import DtProducts from '../../components/productpage/DtProducts';

// MUI
import Hidden from '@material-ui/core/Hidden';
import MbProducts from '../../components/productpage/MbProduct';

const ProductPage = ({ products, catalog }) => {
  const action = useDispatch();
  useEffect(() => {
    action(setProducts(products));
  }, [products]);

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

const QUERY_PRODUCTS = {
  query: `
  query{
    products{
      id
      name
      description
      price
      pictureUrl
      catalog
    }
  }
  `,
};

const QUERY_CATALOGS = {
  query: `
  query{
    catalogs {
      name
    }
  }
  `,
};

export const getStaticProps = async () => {
  const resultProducts = await getData(QUERY_PRODUCTS);
  const resultCatalogs = await getData(QUERY_CATALOGS);
  let products = resultProducts.data.products;
  let catalogs = resultCatalogs.data.catalogs;

  let result = [];
  catalogs.map((catalog, i) => {
    result.push({
      name: catalog.name,
      data: products.filter((product) => product.catalog === catalog.name),
    });
  });
  return { props: { products, catalog: result } };
};

export default ProductPage;
