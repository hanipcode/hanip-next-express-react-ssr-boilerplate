import App, { Container } from 'next/app';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Link from 'next/link';
import Router from 'next/router';
import makeStore from '../client/configureStore';
import Layout from '../layout/Layout';
import Loading from '../layout/Loading';
import { userLogoutState } from '../client/ducks/user';
import Sidebar from '../layout/Sidebar';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  state = {
    isLoggedIn: false,
  };

  logout() {
    const { store } = this.props;
    store.dispatch(userLogoutState());
    Router.replace('/login');
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Layout>
          <Provider store={store}>
            <PersistGate persistor={store.__persistor} loading={<Loading isVisible />}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
          <Sidebar onLogoutPress={() => this.logout()} />
        </Layout>
      </Container>
    );
  }
}

export default withRedux(makeStore, { debug: true })(MyApp);
