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
