import React, { useEffect } from 'react';
import { getUserByAccessToken } from '../apollo/db';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/userActions';
import { setUserLoading } from '../redux/actions/layoutActions';

// Next
import { useRouter } from 'next/router';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_SIGNINWITHACCESSTOKEN } from '../apollo/mutation';

// MUI
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

// components
import DtHero from '../components/homepage/DtHero';
import MbHero from '../components/homepage/MbHero';
import MbPromote from '../components/homepage/MbPromote';

// Other
import axios from 'axios';
import Cookies from 'js-cookie';
import Script from 'react-load-script';
import queryString from 'query-string';
import cookie from 'cookie';

// loadState
import { loadOnlineCartsState } from '../redux/localStore';

const HomePage = ({ user }) => {
  const action = useDispatch();
<<<<<<< HEAD
=======

  useEffect(() => {
    let carts = loadOnlineCartsState();
    if (carts === undefined) {
      carts = [];
    }
    action(setUser(user ? { ...user, carts } : null));
  }, [user]);
>>>>>>> 37c893abbc5e15ee31a9e383d21402e36944409a

  const [signinWithAccessToken, { loading, error }] = useMutation(
    MUTATION_SIGNINWITHACCESSTOKEN,
    {
      onCompleted: (data) => {
        console.log(data.signinWithAccessToken);
        action(setUser(data.signinWithAccessToken));
        action(setUserLoading(false));
      },
    }
  );

  const router = useRouter();
  useEffect(() => {
    if (router.query.code) {
      const lineRequest = {
        grant_type: 'authorization_code',
        code: router.query.code,
        redirect_uri: process.env.LINE_REDIRECT_URI,
        client_id: process.env.LINE_CLIENT_KEY,
        client_secret: process.env.LINE_SECRET_KEY,
      };
<<<<<<< HEAD

=======
      // console.log(lineRequest);
>>>>>>> 37c893abbc5e15ee31a9e383d21402e36944409a
      axios
        .post(
          'https://api.line.me/oauth2/v2.1/token',
          queryString.stringify(lineRequest),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((res) => {
          Cookies.set('accessToken', res.data.access_token);
          action(setUserLoading(true));
          signinWithAccessToken({
            variables: {
              accessToken: res.data.access_token,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router]);

  const handleLiff = async () => {
    let accessToken;
<<<<<<< HEAD
    await liff.init({ liffId: '1656219076-xl6Q9p2v' });
=======
    await liff.init({ liffId: '1654312839-2BOaM90o' });
>>>>>>> 37c893abbc5e15ee31a9e383d21402e36944409a
    accessToken = await liff.getAccessToken();
    if (accessToken) {
      Cookies.set('accessToken', accessToken);
      action(setUserLoading(true));
      signinWithAccessToken({
        variables: {
          accessToken,
        },
      });
    }
  };
  return (
    <>
      <Script
        url="https://static.line-scdn.net/liff/edge/2.1/sdk.js"
        onLoad={() => handleLiff()}
      />
      <Container maxWidth={false} style={{ margin: 0, padding: 0 }}>
        <Hidden smDown>
          <DtHero />
        </Hidden>
        <Hidden mdUp>
          <MbHero />
          <MbPromote />
        </Hidden>
      </Container>
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const { headers } = req;

  const cookies = headers && cookie.parse(headers.cookie || '');
  const accessToken = cookies && cookies.accessToken;
  if (accessToken) {
    const user = await getUserByAccessToken(accessToken);
    return { props: { user } };
  }

  return { props: { user: {} } };
};

export default HomePage;
