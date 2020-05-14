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

export const MUTATION_ADDTOCART = gql`
  mutation MUTATION_ADDTOCART($id: ID!, $quantity: Float!) {
    addToCart(id: $id, quantity: $quantity) {
      id
      product {
        id
        name
        description
        pictureUrl
        catalog
        price
      }
      quantity
    }
  }
`;

export const MUTATION_DELETECART = gql`
  mutation MUTATION_DELETECART($id: ID!) {
    deleteCart(id: $id) {
      id
    }
  }
`;

export const MUTATION_CREATE_ORDER_BYOMISE = gql`
  mutation createOrderByOmise(
    $amount: Float!
    $cardId: String
    $token: String
    $return_uri: String
    $branch: String
    $table: String
    $discount: Float
  ) {
    createOrderByOmise(
      amount: $amount
      cardId: $cardId
      token: $token
      return_uri: $return_uri
      branch: $branch
      table: $table
      discount: $discount
    ) {
      id
      amount
      net
      fee
      fee_vat
      status
      chargeId
      items {
        id
        product {
          description
          price
        }
        quantity
      }
      authorize_uri
    }
  }
`;

export const MUTATION_CREATE_ORDER_BYCASH = gql`
  mutation createOrderByOmise(
    $amount: Float!
    $branch: String
    $table: String
    $discount: Float
  ) {
    createOrderByCash(
      amount: $amount
      branch: $branch
      table: $table
      discount: $discount
    ) {
      id
      amount
      net
      fee
      fee_vat
      status
      chargeId
      items {
        id
        product {
          description
          price
        }
        quantity
      }
      authorize_uri
    }
  }
`;
