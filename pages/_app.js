import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from '../apollo/apolloClient';
import fetch from 'isomorphic-unfetch';

// Framer-motion
import { AnimatePresence } from 'framer-motion';

// Redux
import { Provider } from 'react-redux';
import store from '../redux/store';

// Next
import Head from 'next/head';
import Router from 'next/router';
import { useRouter } from 'next/router';

// Mui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';
import Hidden from '@material-ui/core/Hidden';

// Components
import BottomNavbar from '../components/layouts/BottomNavbar';

// Other
import NProgress from 'nprogress';
import TopNavbar from '../components/layouts/TopNavbar';
import cookie from 'cookie';
import { SET_USER } from '../redux/types';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps, apollo, user }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const router = useRouter();

  useEffect(() => {
    store.dispatch({
      type: SET_USER,
      payload: user ? user : null,
    });
  }, [user]);

  return (
    <React.Fragment>
      <Head>
        <title>Ecommerce with Line</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="./images/logo/logo.jpg" />
        <link rel="stylesheet" type="text/css" href="/styles/nprogress.css" />
        <meta
          name="description"
          content="ระบบ full system e-commerce รองรับการยืนยันตัวตนด้วย Line
              เพื่อเพิ่มความสะดวกสบายให้กับผู้ใช้งาน ทั้ง Admin และ Client
              ระบบออกแบบมาให้คล้ายกับ POS มีทั้งเว็บหน้าบ้าน สำหรับ โปรโมท โฆษณา
              สั่ง สินค้า/อาหาร ระบบตะกร้า ชำระเงินด้วย PAYMENY GATEWAY
              เว็บหลังบ้าน สำหรับจัดการสินค้า คลัง สรุปข้อมูล และอื่นๆ
              ทั้งยังมีระบบแจ้งเตือนลูกค้าด้วย LINE OA ให้ครบวงจร"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Oswald|Paprika|Roboto&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <ApolloProvider client={apollo}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <Hidden smDown>
                <TopNavbar />
              </Hidden>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
              <Hidden mdUp>
                <BottomNavbar />
              </Hidden>
            </React.Fragment>
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    </React.Fragment>
  );
};

const QUERY_USER = {
  query: `
  query{
    user{
      id
      firstName
      lastName
      email
      phone
      pictureUrl
      state
      createdAt
      carts{
        id
        product{
          id
          name
          pictureUrl
          price
        }
        quantity
      }
    }
  }
  `,
};

export const getServerSideProps = async ({ req, res }) => {
  const { headers } = req;

  const cookies = headers && cookie.parse(headers.cookie || '');

  const accessToken = cookies && cookies.accessToken;

  if (!accessToken) {
    if (router.pathname === '/user' || router.pathname === '/carts') {
      res.writeHead(302, { Location: '/signin' });
      res.end();
      return null;
    }
  }

  const uri = process.env.APOLLO_URL;
  if (accessToken) {
    const responseUser = await fetch(uri, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${accessToken}` || '',
      },
      body: JSON.stringify(QUERY_USER),
    });
    const responeUsers = await fetch(uri, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${accessToken}` || '',
      },
      body: JSON.stringify(QUERY_USERS),
    });
    if (responseUser.ok && responeUsers.ok) {
      const user = await responseUser.json();
      const users = await responeUsers.json();

      return { prop: { user: user.data.user, client: users.data.users } };
    } else {
      if (router.pathname === '/user' || router.pathname === '/carts') {
        res.writeHead(302, { Location: '/signin' });
        res.end();
        return null;
      }
      return null;
    }
  }
};

export default apolloClient(MyApp);
