import gql from 'graphql-tag';

export const QUERY_USER = gql`
  query QUERY_USER {
    user {
      id
      lineId
      firstName
      lastName
      email
      phone
      pictureUrl
      state
      carts {
        id
        product {
          id
          name
          pictureUrl
          price
        }
        quantity
      }
    }
  }
`;

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

export const QUERY_PLACE = gql`
  query QUERY_PLACE($id: ID!) {
    place(id: $id) {
      id
      table
      branch {
        id
        branch
      }
      state
      bill {
        id
        adult
        children
        orders {
          id
          storeProduct {
            id
            name
            pictureUrl
            price
          }
        }
      }
    }
  }
`;
