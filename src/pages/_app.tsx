import { type AppType } from 'next/app';

import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { NextUIProvider } from '@nextui-org/react';
import '~/styles/globals.css';
import { api } from '~/utils/api';

import Layout from '../components/layout';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <style jsx global>{`
          :root {
            background-image: linear-gradient(
              to bottom,
              var(--tw-gradient-stops)
            );
            background-color: #2e026d;
            background-color: #15162c;
            scrollbar-color: white #15162c;
          }
        `}</style>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
