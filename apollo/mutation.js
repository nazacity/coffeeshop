import gql from 'graphql-tag';

export const MUTATION_SIGNINWITHACCESSTOKEN = gql`
  mutation MUTATION_SIGNINWITHACCESSTOKEN($accessToken: String) {
    signinWithAccessToken(accessToken: $accessToken) {
      id
      lineId
      firstName
      lastName
      rank
      position
      serviceId
      base
      email
      phone
      pictureUrl
      state
    }
  }
`;

export const MUTATION_REGISTER = gql`
  mutation MUTATION_REGISTER(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $state: String!
    $rank: String!
    $position: String!
    $serviceId: String!
    $base: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      rank: $rank
      position: $position
      serviceId: $serviceId
      base: $base
      phone: $phone
      state: $state
    ) {
      id
      firstName
      lastName
      email
      phone
      state
    }
  }
`;
