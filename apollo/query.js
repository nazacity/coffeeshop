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
      rank
      position
      serviceId
      base
      pictureUrl
      state
    }
  }
`;
