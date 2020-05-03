import gql from 'graphql-tag';

export const QUERY_CATALOGS = gql`
  query QUERY_CATALOGS {
    catalogs {
      name
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query QUERY_PRODUCTS {
    products {
      id
      name
      description
      pictureUrl
      price
      catalog
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query QUERY_PRODUCT($id: String!) {
    product(id: $id) {
      id
      name
      description
      pictureUrl
      price
      catalog
    }
  }
`;
