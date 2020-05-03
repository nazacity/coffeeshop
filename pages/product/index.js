import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { getData } from '../../db';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_ADDTOCART } from '../../apollo/mutation';
import { QUERY_USER } from '../../apollo/query';

// Redux
import { useDispatch } from 'react-redux';
import { setProducts } from '../../redux/actions/productActions';
import { updateUserCart } from '../../redux/actions/userActions';

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
  const [addToCart, { loading, error }] = useMutation(MUTATION_ADDTOCART, {
    onCompleted: (data) => {
      action(updateUserCart(data.addToCart));
    },
  });
  useEffect(() => {
    action(setProducts(products));
  }, [products]);

  return (
    <Container maxWidth={false}>
      <Hidden smDown>
        <DtProducts catalog={catalog} addToCart={addToCart} />
      </Hidden>
      <Hidden mdUp>
        <MbProducts catalog={catalog} addToCart={addToCart} />
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
