import gql from 'graphql-tag';

// export const QUERY_USER = gql`
//   query QUERY_USER {
//     user {
//       id
//       lineId
//       firstName
//       lastName
//       email
//       phone
//       pictureUrl
//       state
//       orders {
//         id
//         amount
//         items {
//           id
//           onlineProduct {
//             id
//             name
//             pictureUrl
//             price
//           }
//           quantity
//         }
//       }
//     }
//   }
// `;

export const QUERY_PLACE = gql`
  query QUERY_PLACE($id: ID!) {
    place(id: $id) {
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
