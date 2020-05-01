import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import withApollo from 'next-with-apollo';

import cookie from 'cookie';

const uri = 'https://us-central1-coffeecafesho.cloudfunctions.net/graphql';
// const uri = 'http://localhost:5000/coffeecafesho/us-central1/graphql';

const httpLink = createHttpLink({ uri, fetch });

const authLink = setContext((_, { headers }) => {
  // Get token from cookie
  let cookies;
  // Server side
  if (headers) {
    cookies = cookie.parse(headers.cookie || '');
  }

  if (typeof window !== undefined) {
    cookies = cookie.parse(document.cookie || '');
  }

  const accessToken = (cookies && cookies.accessToken) || '';

  return {
    headers: {
      ...headers,
      authorization: accessToken ? accessToken : '',
    },
  };
});

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {}),
    });
  }
  // {
  //   render: ({ Page, props }) => {
  //     return (
  //       <ApolloProvider client={props.apollo}>
  //         <Page {...props} />
  //       </ApolloProvider>
  //     );
  //   }
  // }
);
