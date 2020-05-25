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
          quantity
        }
      }
    }
  }
`;
