import { type AppType } from 'next/app';

import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import '~/styles/globals.css';
import { api } from '~/utils/api';

import Layout from '../components/layout';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <SessionProvider session={session}>
      <style jsx global>{`
        :root {
          background-image: background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
          background-color: #2e026d;
          background-color: #15162c;
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
