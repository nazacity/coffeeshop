import gql from 'graphql-tag';

export const MUTATION_SIGNINWITHACCESSTOKEN = gql`
  mutation MUTATION_SIGNINWITHACCESSTOKEN($accessToken: String) {
    signinWithAccessToken(accessToken: $accessToken) {
      id
      lineId
      firstName
      lastName
      email
      phone
      pictureUrl
      state
      orders {
        id
        amount
        createdAt
        items {
          id
          onlineProduct {
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

export const MUTATION_CREATE_ORDERITEM_FROM_STOREORDER = gql`
  mutation createOrderItemFromStoreOrder(
    $tableId: ID!
    $orderItem: [OrderItemInput]
    $branchId: ID!
  ) {
    createOrderItemFromStoreOrder(
      tableId: $tableId
      orderItem: $orderItem
      branchId: $branchId
    ) {
      id
      place {
        id
        branch {
          id
          branch
        }
        state
      }
      adult
      children
      items {
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
`;

export const MUTATION_CREATE_ORDERITEM_FROM_ONLINEORDER = gql`
  mutation createOrderItemFromOnlineOrder(
    $amount: Float!
    $token: String
    $return_uri: String
    $orderItem: [OrderItemInput]
    $branchId: ID!
    $position: CoordsInput!
  ) {
    createOrderItemFromOnlineOrder(
      amount: $amount
      token: $token
      return_uri: $return_uri
      orderItem: $orderItem
      branchId: $branchId
      position: $position
    ) {
      id
      authorizeUri
    }
  }
`;

export const MUTATION_PLACEFROMID = gql`
  mutation MUTATION_PLACEFROMID($id: ID!) {
    placeFromId(id: $id) {
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
        items {
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
