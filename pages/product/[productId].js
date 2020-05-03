import React, { useState, useEffect } from 'react';

// Redux

// MUI
import Hidden from '@material-ui/core/Hidden';

// Next
import Link from '../../src/Link';
import Head from 'next/head';
import { useRouter } from 'next/router';

// framer motion
import { motion } from 'framer-motion';

// Apollo
import { getData } from '../../db';
// import { useQuery } from '@apollo/react-hooks';
// import { QUERY_PRODUCT, QUERY_PRODUCTS } from '../../apollo/query';

// Components
import MbProductItem from '../../components/productItemPage/MbProductItem';
import DtProductItem from '../../components/productItemPage/DtProductItem';

const ProductItem = ({ products, product }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <Hidden smDown>
          <DtProductItem product={product} products={products} />
        </Hidden>
        <Hidden mdUp>
          <MbProductItem product={product} products={products} />
        </Hidden>
      </motion.div>
    </>
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

export const getStaticPaths = async () => {
  const result = await getData(QUERY_PRODUCTS);
  const data = result.data.products;

  const paths = data.map((product) => ({
    params: { productId: product.id },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const result = await getData(QUERY_PRODUCTS);
  const data = result.data.products;

  const product = data.find((data) => data.id == params.productId);
  return {
    props: { product, products: data },
  };
};

export default ProductItem;
