import React, { useEffect } from 'react';
import { getData, QUERY_PROMOTIONS, getUserByAccessToken } from '../apollo/db';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/userActions';
import { setUserLoading } from '../redux/actions/layoutActions';

// Next
import { useRouter } from 'next/router';

// Apollo
import { useMutation } from '@apollo/react-hooks';

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

import { MUTATION_SIGNINWITHACCESSTOKEN } from '../apollo/mutation';

const HomePage = ({ promotions, user }) => {
  const action = useDispatch();

  useEffect(() => {
    action(setUser(user ? user : null));
  }, [user]);

  const [signinWithAccessToken, { loading, error }] = useMutation(
    MUTATION_SIGNINWITHACCESSTOKEN,
    {
      onCompleted: (data) => {
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
      // console.log(lineRequest);
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
    await liff.init({ liffId: '1654152621-wnWBO620' });
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
    <React.Fragment>
      <Script
        url="https://static.line-scdn.net/liff/edge/2.1/sdk.js"
        onLoad={() => handleLiff()}
      />
      <Container maxWidth={false} style={{ margin: 0, padding: 0 }}>
        <Hidden smDown>
          <DtHero promotions={promotions} />
        </Hidden>
        <Hidden mdUp>
          <MbHero />
          <MbPromote promotions={promotions} />
        </Hidden>
      </Container>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const resultPromotions = await getData(QUERY_PROMOTIONS);
  let promotions = resultPromotions.data.promotion;

  const { headers } = req;

  const cookies = headers && cookie.parse(headers.cookie || '');
  const accessToken = cookies && cookies.accessToken;

  const user = await getUserByAccessToken(accessToken);

  return { props: { promotions, user } };
};

export default HomePage;
