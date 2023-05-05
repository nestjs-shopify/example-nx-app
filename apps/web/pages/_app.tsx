import '@shopify/polaris/build/esm/styles.css';

import App from 'next/app';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {
  Provider as AppBridgeProvider,
  useAppBridge,
} from '@shopify/app-bridge-react';
import { AppProvider as PolarisProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';

import { userLoggedInFetch } from '../utils/userLoggedInFetch';

function MyProvider(props) {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: '/api/graphql',
      credentials: 'include',
      fetch: userLoggedInFetch(app),
    }),
  });

  const { Component } = props;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps, host } = this.props;

    return (
      <PolarisProvider i18n={translations}>
        <AppBridgeProvider
          config={{
            apiKey: process.env.SHOPIFY_API_KEY,
            host,
            forceRedirect: true,
          }}
        >
          <MyProvider Component={Component} host={host} {...pageProps} />
        </AppBridgeProvider>
      </PolarisProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx: { query, res } }) => {
  const { host, shop } = query as Record<string, string>;

  if (!host) {
    const currentShop = shop ?? process.env.SHOP;

    if (res) {
      res.writeHead(307, { Location: `/api/online/auth?shop=${currentShop}` });
      res.end();

      return { pageProps: {} };
    }

    return {
      pageProps: {},
    };
  }

  return {
    pageProps: { host, shop },
    host,
    shop,
  };
};

export default MyApp;
