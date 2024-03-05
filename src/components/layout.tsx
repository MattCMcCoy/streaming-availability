import { Inter as FontSans, Inter } from 'next/font/google';
import Head from 'next/head';

import { Toaster } from './ui/toaster';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export default function Layout({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <>
      <Head>
        <title>Popcorn Streaming</title>
        <meta
          name="description"
          content="A platform for discovering where a movie is streaming"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-b to-[#53357b] via-[#15162c] from-[#15162c] overflow-auto h-screen font-sans font-inter">
        {children}
        <Toaster />
      </main>
    </>
  );
}
