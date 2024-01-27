import type { AppProps } from 'next/app';
import Head from 'next/head';

import { NotificationContextProvider } from '@/context/NotificationContext';

import Layout from '@/components/layout/Layout';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta name="description" content="Lorem ipsum..." />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
