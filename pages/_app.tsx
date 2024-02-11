import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';

import Layout from '@/components/layout/Layout';

import '@/styles/globals.scss';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
