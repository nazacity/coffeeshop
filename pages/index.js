import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
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
import gql from 'graphql-tag';

const MUTATION_SIGNINWITHACCESSTOKEN = gql`
  mutation MUTATION_SIGNINWITHACCESSTOKEN($accessToken: String) {
    signinWithAccessToken(accessToken: $accessToken) {
      id
      firstName
      lastName
      email
      phone
      pictureUrl
      address {
        id
        subdetail
        district
        city
        province
        zip
      }
      products {
        id
        name
        pictureUrl
        price
      }
      carts {
        id
        product {
          name
          pictureUrl
          price
        }
      }
      state
      createdAt
    }
  }
`;

const HomePage = ({ setUser, user, setUserLoading }) => {
  const promoteObject = [
    {
      id: 1,
      imageUrl: './images/homepage/home1.jpg',
      title: 'พื้นที่',
      subtitle: 'บรรยากาศสวยงาม',
    },
    {
      id: 2,
      imageUrl: './images/homepage/home2.jpg',
      title: 'เมนู',
      subtitle: 'อาหารเลิศรส',
    },
    {
      id: 3,
      imageUrl: './images/homepage/home3.jpg',
      title: 'กาแฟ',
      subtitle: 'เครื่องดื่มกาแฟที่ไม่เหมือนใคร',
    },
  ];

  const [signinWithAccessToken, { loading, error }] = useMutation(
    MUTATION_SIGNINWITHACCESSTOKEN,
    {
      onCompleted: (data) => {
        setUser(data.signinWithAccessToken);
        setUserLoading(false);
      },
    }
  );

  const router = useRouter();
  useEffect(() => {
    if (router.query.code) {
      // axios
      //   .post(
      //     'https://api.line.me/oauth2/v2.1/token',
      //     queryString.stringify({
      //       grant_type: 'authorization_code',
      //       code: router.query.code,
      //       redirect_uri: 'https://coffeecafe.now.sh',
      //       client_id: '1654152621',
      //       client_secret: '088830d18fdc146db3e7cb7f249fca9f'
      //     }),
      //     {
      //       headers: {
      //         'Content-Type': 'application/x-www-form-urlencoded'
      //       }
      //     }
      //   )
      axios
        .post(
          'https://api.line.me/oauth2/v2.1/token',
          queryString.stringify({
            grant_type: 'authorization_code',
            code: router.query.code,
            redirect_uri: 'http://localhost:3000',
            client_id: '1654159386',
            client_secret: '4f7d57c4e61ea3f71574739a08023ebf',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((res) => {
          Cookies.set('accessToken', res.data.access_token);
          setUserLoading(true);
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
      setUserLoading(true);
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
          <div style={{ position: 'relative', height: '50vh' }}>
            <DtHero />
          </div>
          <DtPromote promoteObject={promoteObject} />
        </Hidden>
        <Hidden mdUp>
          <MbHero />
          <MbPromote promoteObject={promoteObject} />
        </Hidden>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {
  setUser,
  setUserLoading,
};

export default connect(mapStateToProps, mapActionToProps)(HomePage);
