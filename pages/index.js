import React, { useEffect } from 'react';
import { getData, QUERY_PROMOTIONS } from '../apollo/db';

// Redux
import { useSelector, useDispatch } from 'react-redux';
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
import DtPromote from '../components/homepage/DtPromote';
import MbHero from '../components/homepage/MbHero';
import MbPromote from '../components/homepage/MbPromote';

// Other
import axios from 'axios';
import Cookies from 'js-cookie';
import Script from 'react-load-script';
import queryString from 'query-string';

import { MUTATION_SIGNINWITHACCESSTOKEN } from '../apollo/mutation';

const HomePage = ({ promotions }) => {
  const user = useSelector((state) => state.user);
  const action = useDispatch();

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

export const getStaticProps = async () => {
  const resultPromotions = await getData(QUERY_PROMOTIONS);
  let promotions = resultPromotions.data.promotion;

  return { props: { promotions: promotions } };
};

export default HomePage;
